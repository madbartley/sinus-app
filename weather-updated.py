import openmeteo_requests

import pandas as pd
import requests_cache
from retry_requests import retry

# to format the date from hourly_dataframe from yyyy/mm/dd to dd/mm/yyyy
import datetime

import json

import mysql.connector

# Grabbing my database credentials from the .json file in the .gitignore
with open("./sinus-app/config.json") as creds:
    config = json.load(creds)

# Connecting to the MySQL database

try:
    db = mysql.connector.connect(
        host=config["db_host"],
        user=config["db_user"],
        password=config["db_password"]
    )
    print("Connected to MySQL server!")

except mysql.connector.Error as error:
    print(f"Error connecting to MySQL: {error}")
    exit()

# Get a cursor
cur = db.cursor()


# ### API info, taken from Open-Meteo ### #

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)

# Make sure all required weather variables are listed here
# The order of variables in hourly or daily is important to assign them correctly below
url = "https://api.open-meteo.com/v1/forecast"
params = {
	"latitude": 42.4797890577543,
	"longitude": -83.11439556901848,
	"hourly": ["temperature_2m", "relative_humidity_2m", "precipitation", "rain", "surface_pressure", "pressure_msl"],
	"current": ["rain", "precipitation", "temperature_2m", "is_day", "pressure_msl"],
	"timezone": "America/New_York",
	"past_days": 31,
	"forecast_days": 14,
	"wind_speed_unit": "mph",
	"temperature_unit": "fahrenheit",
	"precipitation_unit": "inch"
}
responses = openmeteo.weather_api(url, params=params)

# Process first location. Add a for-loop for multiple locations or weather models
response = responses[0]
print(f"Coordinates {response.Latitude()}°N {response.Longitude()}°E")
print(f"Elevation {response.Elevation()} m asl")
print(f"Timezone {response.Timezone()}{response.TimezoneAbbreviation()}")
print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")

# Current values. The order of variables needs to be the same as requested.
current = response.Current()
current_rain = current.Variables(0).Value()
current_precipitation = current.Variables(1).Value()
current_temperature_2m = current.Variables(2).Value()
current_is_day = current.Variables(3).Value()
current_pressure_msl = current.Variables(4).Value()

print(f"Current time {current.Time()}")
print(f"Current rain {current_rain}")
print(f"Current precipitation {current_precipitation}")
print(f"Current temperature_2m {current_temperature_2m}")
print(f"Current is_day {current_is_day}")
print(f"Current pressure_msl {current_pressure_msl}")

# Process hourly data. The order of variables needs to be the same as requested.
hourly = response.Hourly()
hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
hourly_relative_humidity_2m = hourly.Variables(1).ValuesAsNumpy()
hourly_precipitation = hourly.Variables(2).ValuesAsNumpy()
hourly_rain = hourly.Variables(3).ValuesAsNumpy()
hourly_surface_pressure = hourly.Variables(4).ValuesAsNumpy()
hourly_pressure_msl = hourly.Variables(5).ValuesAsNumpy()

hourly_data = {"date": pd.date_range(
	start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
	end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
	freq = pd.Timedelta(seconds = hourly.Interval()),
	inclusive = "left"
)}

hourly_data["temperature_2m"] = hourly_temperature_2m
hourly_data["relative_humidity_2m"] = hourly_relative_humidity_2m
hourly_data["precipitation"] = hourly_precipitation
hourly_data["rain"] = hourly_rain
hourly_data["surface_pressure"] = hourly_surface_pressure
hourly_data["pressure_msl"] = hourly_pressure_msl

hourly_dataframe = pd.DataFrame(data = hourly_data)
# print(hourly_dataframe)


# ### Begin my code ### #

# Creating a class with all of the weather stats in it - an instance of the class for each day will be generated when the backend service hits the API at midnight, and that's what will be passed to the mobile app
    # the class needs variables for is_day and current pressure directly from the data frame, as well as all of the stats that I create with the looping

class Weather:

    # Atmostpheric pressure from the API is given in the SI unit hectopascals (hPa), but I am converting to "inches of mercury" (iom), which is more common in the US (very interesting history involving early aviation equipment as to why we use inches of mercury rather than hPa)
    # Conversion number to go from hPa to iom
    merc_conversion = 0.02952998057228

    # starting row numbers for grabbing correct info from dataframe
    next = 740
    past_24 = 726
    past_3 = 668
    past_7 = 572
    past_12 = 452
    past_30 = 20

    def __init__(self, hourly_dataframe):
        # passing in the new dataframe
        self.hourly_dataframe = hourly_dataframe

        # variables generated

        # mins and maxes
        self.mins_maxes = self.get_min_max(self.past_7)
        self.past_min_24_hrs = self.mins_maxes[0]
        self.past_max_24_hrs = self.mins_maxes[1]
        self.past_min_3_days = self.mins_maxes[2]
        self.past_max_3_days = self.mins_maxes[3]
        self.past_min_7_days = self.mins_maxes[4]
        self.past_max_7_days = self.mins_maxes[5]
        self.next_min_24_hrs = self.mins_maxes[6]
        self.next_max_24_hrs = self.mins_maxes[7]
        self.next_min_3_days = self.mins_maxes[8]
        self.next_max_3_days = self.mins_maxes[9]
        self.next_min_7_days = self.mins_maxes[10]
        self.next_max_7_days = self.mins_maxes[11]

        # 24 hour ranges
        self.psr_range_past_24_hrs = self.get_range(1, self.past_24) # general function for getting range over all days and avg range over the days; parameters: (# of days, starting row #, whether this is an averag (optional, default is False))
        self.psr_range_next_24_hrs = self.get_range(1, self.next)

        # 3 day ranges
        self.psr_range_past_3_days = self.get_range(3, self.past_3)
        self.avg_psr_range_past_3_days = self.get_range(3, self.past_3, True) 
        self.psr_range_next_3_days = self.get_range(3, self.next)
        self.avg_psr_range_next_3_days = self.get_range(3, self.next, True)

        # 7 day ranges
        self.psr_range_past_7_days = self.get_range(7, self.past_7)
        self.avg_psr_range_past_7_days = self.get_range(7, self.past_7, True)
        self.psr_range_next_7_days = self.get_range(7, self.next)
        self.avg_psr_range_next_7_days = self.get_range(7, self.next, True)

        # past 30 day ranges
        self.psr_range_past_30_days = self.get_range(30, self.past_30) 
        self.avg_psr_range_past_30_days = self.get_range(30, self.past_30, True)

        # 24 hour avg hourly changes
        self.avg_hourly_change_past_24_hrs = self.get_change(1, self.past_24) # function to get average hourly changes; paramters(# of days, start row #)
        self.avg_hourly_change_next_24_hrs = self.get_change(1, self.next)
        
        # 3 day avg hourly changes
        self.avg_hourly_change_past_3_days = self.get_change(3, self.past_3)
        self.avg_hourly_change_next_3_days = self.get_change(3, self.next)
                
        # 7 day avg hourly changes
        self.avg_hourly_change_past_7_days = self.get_change(7, self.past_7)
        self.avg_hourly_change_next_7_days = self.get_change(7, self.next)

        # 12 day avg hourly changes
        self.avg_hourly_change_past_7_days = self.get_change(12, self.past_12)
        self.avg_hourly_change_next_7_days = self.get_change(12, self.next)
               
        # past 30 day avg hourly changes
        self.avg_hourly_change_past_30_days = self.get_change(30, self.past_30)

    def get_min_max(self, num_rows):
        # all 336 hours stored here
        hourly_data = []

        # 24 hour, 3 day, and 7 day min/max for past and future go here
        min_max_list = []

        for i in range(336):
            hourly_data.append(float(self.hourly_dataframe["pressure_msl"][i + num_rows])*self.merc_conversion)

        # past 24 hours
        min_max_list.append(min(hourly_data[144:169]))
        min_max_list.append(max(hourly_data[144:169]))
        # past 3 days
        min_max_list.append(min(hourly_data[96:169]))
        min_max_list.append(max(hourly_data[96:169]))
        # past 7 days
        min_max_list.append(min(hourly_data[:169]))
        min_max_list.append(max(hourly_data[:169]))
        # next 24 hours
        min_max_list.append(min(hourly_data[169:193]))
        min_max_list.append(max(hourly_data[169:193]))
        # next 3 days
        min_max_list.append(min(hourly_data[169:241]))
        min_max_list.append(max(hourly_data[169:241]))
        # next 7 days
        min_max_list.append(min(hourly_data[169:]))
        min_max_list.append(max(hourly_data[169:]))

        print("MIN MAX LIST: ", min_max_list)

        return min_max_list

    def get_range(self, num_days, start, avg=False):
        
        # add all of the hourly pressure data for every day
        total_hourly_data = []

        # add only the hourly data for each day
        daily_hourly_data = []

        # for each day, store the range in this array
        ranges_array = []

        start_row = start
        for i in range(num_days):
            for j in range(24):
                total_hourly_data.append(float(self.hourly_dataframe["pressure_msl"][j + start_row])*self.merc_conversion)
                daily_hourly_data.append(float(self.hourly_dataframe["pressure_msl"][j + start_row])*self.merc_conversion)
            start_row += 24 # iterate the starting row to the next day's "midnight" row 
            # note: you MUST call min/max methods on arrays on separate lines or they will both return the same number
            max_val = max(daily_hourly_data)
            min_val = min(daily_hourly_data)
            ranges_array.append(max_val - min_val) # add this day's range to the array
            daily_hourly_data.clear() # refresh this array to store the next day's data

        # note: you MUST call min/max methods on arrays on separate lines or they will both return the same number
        max_range = max(total_hourly_data)
        min_range = min(total_hourly_data)

        total_range = max_range - min_range

        avg_range = sum(ranges_array)/num_days

        if avg == True:
            print("Average range for ", num_days, ": ", avg_range)
            return avg_range
        else:
            print("Range over a total of ", num_days, " days: ", avg_range)
            return total_range
        
    def get_change(self, num_days, start):

        hourly_changes = []

        start_row = start
        for i in range(num_days):
            for j in range(23):
                first_hourly = (float(self.hourly_dataframe["pressure_msl"][start_row+j])*self.merc_conversion)
                next_hourly = (float(self.hourly_dataframe["pressure_msl"][start_row+j+1])*self.merc_conversion)
                hourly_changes.append(next_hourly - first_hourly)
  
        avg_hourly_change = sum(hourly_changes)/(num_days*23)

        print("Average hourly change over ", num_days, " days: ", avg_hourly_change) 
        return avg_hourly_change


today = Weather(hourly_dataframe)

hourly_dataframe['date'] = pd.to_datetime(hourly_dataframe['date']).dt.date

day = str(hourly_dataframe['date'][740])
print(day)







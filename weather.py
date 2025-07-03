import openmeteo_requests

import pandas as pd
import requests_cache
from retry_requests import retry

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

print("Printing TODAY'S DATE: ", hourly_data["date"][740])

# To get the Mean Sea Level pressure (pressure_msl) from the current hectopascals into inches of mercury, multiply the msl by 0.02952998057228
merc_conversion = 0.02952998057228
print("Printing the inches of mercury barometric pressure for today: ", (hourly_data["pressure_msl"][740])*merc_conversion)

# Barometric pressure typically peaks twice a day at 10am and again at 10pm, and dips to it's lowest readings at 4am and again at 4pm.

# Stats that I need: 
	# current pressure [x]
    # pressure range in the last 24 hours [x]
    # pressure daily range for the last 7 days [x]
    # average daily range for the last 7 days [x]
    # average daily pressure range for the last month [x]
    # average hourly change in the past 24 hours [x] *** this one isn't *technically* possible since I can't access current weather; only one API call per day, might still do this based on the predictions given 
    # average hourly change in the past 3 days [x]
    # average daily pressure change for coming 14 days []
    # average daily pressure change for coming 3 days []
    # average hourly pressure change for coming 24 hours [x]
    # average hourly pressure change for coming 3 days [x]
    # daily pressure range prediction for next 3 days []
    # daily pressure range prediction for next 14 days [x]

    
# current pressure, from above:
print("Current pressure: ", current_pressure_msl)

hourly_pressure = []

for i in range(25):
    hourly_pressure.append(float((hourly_dataframe["pressure_msl"][740+i])*merc_conversion))
    
daily_psr_min = min(hourly_pressure)
daily_psr_max = max(hourly_pressure)

daily_prs_range = daily_psr_max - daily_psr_min

# pressure range for today (24 hours, including predictions)
print("Today's pressure range: {:.5f}".format(daily_prs_range))

# date for 7 days ago
print("The date one week ago: ", hourly_dataframe["date"][572])

# initializing an empty list so I can add the daily ranges later by index instead of appending
# right now, things are printing in the "for" loop below, but I'm also storing them here for future use
daily_psr_ranges = [0,0,0,0,0,0,0,0]
daily_psr_mins = [0,0,0,0,0,0,0,0]
daily_psr_maxes = [0,0,0,0,0,0,0,0]

# calculating the daily ranges for the last week, including today
x = 572
for i in range(8):
    for j in range(24):
        hourly_pressure[j] = (float(hourly_dataframe["pressure_msl"][x+j])*merc_conversion)
    x += 24
    daily_psr_min = min(hourly_pressure)
    daily_psr_mins[i] = daily_psr_min
    daily_psr_max = max(hourly_pressure)
    daily_psr_maxes[i] = daily_psr_max
    daily_psr_range = daily_psr_max - daily_psr_min
    daily_psr_ranges[i] = daily_psr_range
    print("Daily range for",hourly_dataframe["date"][x - 24],": {:.8f}".format(daily_psr_ranges[i]))
    

# average for the last week, including today, so really the last 8 days
avg_daily_psr_range = (sum(daily_psr_ranges)/8) 

print("Average daily pressure range: {:.5f}".format(avg_daily_psr_range))

# getting the average daily range for the past month (all data except the last 14 days - will need to modify this later when I get the full prediction set, for now this is the FULL data set including the predictions)
# might adjust this later since I have access to the past 2 months
total_psr_avg_ranges = []

# using the same for-loop over all 44 days in the dataset, getting each hour's pressure, finding the min/max every day, adding that to a list and taking the average of those numbers
x = 0
for i in range(44):
    for j in range(24):
        hourly_pressure[j] = (float(hourly_dataframe["pressure_msl"][x+j])*merc_conversion)
    x += 24
    daily_psr_min = min(hourly_pressure)
    daily_psr_max = max(hourly_pressure)
    daily_psr_range = daily_psr_max - daily_psr_min
    total_psr_avg_ranges.append(daily_psr_range)

total_psr_range_avg = (sum(total_psr_avg_ranges)/44)
print("Total average daily range over one month: ", total_psr_range_avg)


print("3 days ago on the 24th: ", hourly_dataframe["date"][668])

# Getting the average hourly change over the past 24 hours

one_day_hourly_changes = []

x = 740
for j in range(24):
    # print("DATE NOW FOR 24 HOURS CHANGES ", hourly_dataframe["date"][x+j])
    hourly_psr_first = (float(hourly_dataframe["pressure_msl"][x+j])*merc_conversion)
    hourly_psr_next = (float(hourly_dataframe["pressure_msl"][x+j+1])*merc_conversion)
    hourly_change = hourly_psr_next - hourly_psr_first
one_day_hourly_changes.append(hourly_change)


one_day_avg_psr_change = (sum(one_day_hourly_changes))/24

print("Average hourly change for today is estimated to be: {:.5f}".format(one_day_avg_psr_change))


# Getting the average hourly change over the past 3 days (not including today - so starting from 4 days ago)
three_day_hourly_changes = []

x = 668
for i in range(3):
    for j in range(24):
        # print("DATE NOW FOR 72 HOURS CHANGES ", hourly_dataframe["date"][x+j])
        hourly_psr_first = (float(hourly_dataframe["pressure_msl"][x+j])*merc_conversion)
        hourly_psr_next = (float(hourly_dataframe["pressure_msl"][x+j+1])*merc_conversion)
        hourly_change = hourly_psr_next - hourly_psr_first
        three_day_hourly_changes.append(hourly_change)
    x += 24

three_day_avg_psr_change = (sum(three_day_hourly_changes))/72

print("Average hourly change over the past 3 days: {:.5f}".format(three_day_avg_psr_change))



# Getting the average hourly change over the next 3 days - not counting today, so starting tomorrow
three_day_future_hourly_changes = []

x = 764
for i in range(3):
    for j in range(24):
        # print("DATE NOW FOR 72 ***FUTURE*** HOURS CHANGES ", hourly_dataframe["date"][x+j])
        hourly_psr_future_first = (float(hourly_dataframe["pressure_msl"][x+j])*merc_conversion)
        hourly_psr_future_next = (float(hourly_dataframe["pressure_msl"][x+j+1])*merc_conversion)
        hourly_change = hourly_psr_future_next - hourly_psr_future_first
        three_day_future_hourly_changes.append(hourly_change)
    x += 24

three_day_future_avg_psr_change = (sum(three_day_future_hourly_changes))/72

print("Average hourly change predicted over the next 3 days: {:.5f}".format(three_day_future_avg_psr_change))


# Getting the average hourly change over the next 14 days, INCLUDING TODAY (mostly because the data only goes until 3:00am on the 14th day)
fourteen_day_future_hourly_changes = []

x = 740
for i in range(14):
    for j in range(24):
        hourly_psr_future_first = (float(hourly_dataframe["pressure_msl"][x+j])*merc_conversion)
        hourly_psr_future_next = (float(hourly_dataframe["pressure_msl"][x+j+1])*merc_conversion)
        hourly_change = hourly_psr_future_next - hourly_psr_future_first
        fourteen_day_future_hourly_changes.append(hourly_change)
    x += 24

fourteen_day_future_avg_psr_change = (sum(fourteen_day_future_hourly_changes))/336

print("Average hourly change predicted over the next 14 days, including today: {:.5f}".format(fourteen_day_future_avg_psr_change))


hourly_pressure_predict = []

for i in range(25):
    hourly_pressure_predict.append(float((hourly_dataframe["pressure_msl"][740+i])*merc_conversion))
    
daily_psr_min = min(hourly_pressure_predict)
daily_psr_max = max(hourly_pressure_predict)

daily_prs_range = daily_psr_max - daily_psr_min

# initializing an empty list so I can add the daily ranges later by index instead of appending
# right now, things are printing in the "for" loop below, but I'm also storing them here for future use

daily_psr_ranges_predict = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
daily_psr_mins_predict = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
daily_psr_maxes_predict = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

print("Daily range predictions for the next 12 days")

# calculating the daily ranges for the next 12 days, including today
x = 740
for i in range(13):
    for j in range(24):
        if hourly_dataframe["pressure_msl"][x+j] != None:
            hourly_pressure_predict[j] = (float(hourly_dataframe["pressure_msl"][x+j])*merc_conversion)
            #print(hourly_dataframe["date"][x+j])
    x += 24
    daily_psr_min = min(hourly_pressure_predict)
    daily_psr_mins_predict[i] = daily_psr_min
    daily_psr_max = max(hourly_pressure_predict)
    daily_psr_maxes_predict[i] = daily_psr_max
    daily_psr_range = daily_psr_max - daily_psr_min
    daily_psr_ranges_predict[i] = daily_psr_range
    print("Daily range prediction for:",hourly_dataframe["date"][x - 24] ,"{:.5f}".format(daily_psr_ranges_predict[i]))

# Average daily range over the next 12 days

avg_daily_range_predict_12 = (sum(daily_psr_ranges_predict))/12

print("Average daily range predicted over the next 12 days: {:.5f}".format(avg_daily_range_predict_12))

# Predicting average range for the next three days, not including today

# comment this out to use hourly_pressure_predict above, or else you have to manually initialize this to be full of 0s
# hourly_pressure_predict_3 = []

daily_psr_ranges_predict_3 = [0,0,0]
daily_psr_mins_predict_3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
daily_psr_maxes_predict_3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

x = 764
for i in range(3):
    for j in range(24):
        if hourly_dataframe["pressure_msl"][x+j] != None:
            hourly_pressure_predict[j] = (float(hourly_dataframe["pressure_msl"][x+j])*merc_conversion)
            # print(hourly_dataframe["date"][x+j])
    x += 24
    daily_psr_min = min(hourly_pressure_predict)
    daily_psr_mins_predict_3[i] = daily_psr_min
    daily_psr_max = max(hourly_pressure_predict)
    daily_psr_maxes_predict_3[i] = daily_psr_max
    daily_psr_range = daily_psr_max - daily_psr_min
    daily_psr_ranges_predict_3[i] = daily_psr_range
    print("Daily range prediction for:",hourly_dataframe["date"][x - 24] ,"{:.8f}".format(daily_psr_ranges_predict_3[i]))

avg_daily_range_predict_3 = (sum(daily_psr_ranges_predict_3))/3

print("Average daily range predicted over the next 3 days: {:.5f}".format(avg_daily_range_predict_3))








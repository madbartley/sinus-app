from django.db import models

# Create your models here.

class PressureStats(models.Model):
    day_time = models.DateField()
    past_min_24 = models.FloatField() 
    past_max_24 = models.FloatField() 
    past_min_3 = models.FloatField() 
    past_max_3 = models.FloatField() 
    past_min_7 = models.FloatField() 
    past_max_7 = models.FloatField() 
    next_min_24 = models.FloatField() 
    next_max_24 = models.FloatField() 
    next_min_3 = models.FloatField() 
    next_max_3 = models.FloatField() 
    next_min_7 = models.FloatField() 
    next_max_7 = models.FloatField() 
    past_range_24 = models.FloatField() 
    next_range_24 = models.FloatField() 
    past_range_3 = models.FloatField() 
    next_range_3 = models.FloatField() 
    past_avg_range_3 = models.FloatField() 
    next_avg_range_3 = models.FloatField() 
    past_range_7 = models.FloatField() 
    next_range_7 = models.FloatField() 
    next_avg_range_7 = models.FloatField() 
    past_avg_range_7 = models.FloatField() 
    past_range_30 = models.FloatField() 
    past_avg_range_30 = models.FloatField() 
    past_avg_hrly_change_24 = models.FloatField() 
    next_avg_hrly_change_24 = models.FloatField() 
    past_avg_hrly_change_3 = models.FloatField() 
    next_avg_hrly_change_3 = models.FloatField() 
    past_avg_hrly_change_7 = models.FloatField() 
    next_avg_hrly_change_7 = models.FloatField() 
    past_avg_hrly_change_30 = models.FloatField()


class HeadachesReported(models.Model):
    day_time = models.DateField()
    headache_reported = models.BooleanField()
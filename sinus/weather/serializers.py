from rest_framework import serializers
from .models import PressureStats, HeadachesReported


class PressureStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PressureStats
        fields = '__all__'

class HeadachesReportedSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeadachesReported
        fields = '__all__'
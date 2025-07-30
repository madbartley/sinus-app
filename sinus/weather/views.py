from django.shortcuts import render
from rest_framework import viewsets
from .models import PressureStats, HeadachesReported 
from .serializers import PressureStatsSerializer, HeadachesReportedSerializer 

class PressureStatsViewSet(viewsets.ModelViewSet):
    serializer_class = PressureStatsSerializer
    queryset = PressureStats.objects.all()

class HeadachesReportedViewSet(viewsets.ModelViewSet):
    serializer_class = HeadachesReportedSerializer
    queryset = HeadachesReported.objects.all() 


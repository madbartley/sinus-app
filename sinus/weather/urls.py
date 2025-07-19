from rest_framework import renderers
from django.urls import path
from .views import PressureStatsViewSet, HeadachesReportedViewSet

weather_list = PressureStatsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
weather_detail = PressureStatsViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

headaches_list = HeadachesReportedViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
headaches_detail = HeadachesReportedViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
    path('pressure-stats/', weather_list, name='weather-list'),
    path('pressure-details/<int:day_time>/', weather_detail, name='weather-detail'),
    path('headaches-reported/', headaches_list, name='headaches-list'),
    path('headaches-details/<int:day_time>/', headaches_detail, name='headaches-detail'),
]
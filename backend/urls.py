from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('predict/manual/', views.manual_predict_view),
    path('predict/file/', views.file_predict_view),
    path('test/', views.scoring_url_predict_view),
]

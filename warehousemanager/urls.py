from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("frontend.urls")),
    path('', include("backend.urls")),
    path('', include('accounts.urls')),
    path('', include('inventory.urls')),
]

from django.urls import path, include
from .api import MealViewset, ItemViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/inventory/meal', MealViewset)
router.register(r'api/inventory/item', ItemViewset)

urlpatterns = [
  path('',include(router.urls))
]
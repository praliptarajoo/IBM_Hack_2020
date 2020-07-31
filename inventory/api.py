from rest_framework import viewsets,filters, status, permissions
from rest_framework.response import Response
from .models import Meal, Item
from .serializers import MealSerializer, ItemSerializer 

class MealViewset(viewsets.ModelViewSet): 
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  queryset = Meal.objects.all()
  serializer_class = MealSerializer
  lookup_field = 'meal_id'
  filter_backends = [filters.OrderingFilter]
  ordering_fields = ['meal_id']

class ItemViewset(viewsets.ModelViewSet):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  queryset = Item.objects.all()
  serializer_class = ItemSerializer
  filter_backends = [filters.OrderingFilter]
  ordering_fields = ['id']

from rest_framework import serializers
from .models import Meal, Item

class ItemSerializer(serializers.ModelSerializer):
  class Meta:
    ordering = ['-id']
    model = Item
    fields = ('id', 'name', 'category', 'system_stock', 'actual_stock', 'meals')
    extra_kwargs = {'meals': {'required': False}}

class MealSerializer(serializers.ModelSerializer):
  items = ItemSerializer(many=True, read_only=True)
  class Meta:
    model = Meal
    fields = ('meal_id', 'category', 'cuisine', 'items')
    extra_kwargs = {'items': {'required': False}}


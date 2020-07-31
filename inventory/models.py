from django.db import models

class Meal(models.Model):
  meal_id = models.IntegerField(blank=False, primary_key=True)
  category = models.CharField(max_length=10,blank=False)
  cuisine = models.CharField(max_length=10, blank=False)

class Item(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=10, blank=False)
  category = models.CharField(max_length=10,blank=False)
  system_stock = models.IntegerField()
  actual_stock = models.IntegerField(default=0)
  meals = models.ManyToManyField('Meal', related_name='items', blank=True)
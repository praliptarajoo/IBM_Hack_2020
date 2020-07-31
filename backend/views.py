from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .utils.predict import get_predictions, get_file_predictions, get_endpoint_predictions

import json
import os

# Prediction views
@permission_classes([IsAuthenticated])
def manual_predict_view(request, *args, **kwargs):
    if request.is_ajax():
        if request.method == 'POST':
            predictions = get_predictions(json.loads(request.body))
            return JsonResponse(predictions, status=200)
        else:
            return JsonResponse({"message": "Method not allowed"}, status=401)
    else:
        return JsonResponse({"message": "Request Not Allowed"}, status=401)

@permission_classes([IsAuthenticated])
def file_predict_view(request, *args, **kwargs):
    if request.is_ajax():
        if request.method == 'POST' and request.FILES['file']:
            myfile = request.FILES['file']
            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
            predictions = get_file_predictions(filename)
            return JsonResponse(predictions, status=200)
        else:
            return JsonResponse({"message": "Method not allowed"}, status=401)
    else:
        return JsonResponse({"message": "Request Not Allowed"}, status=401)

def scoring_url_predict_view(request, *args, **kwargs):
    if request.is_ajax():
        if request.method == "POST":
            predictions = get_endpoint_predictions(json.loads(request.body))
            return JsonResponse(predictions, status=200)
        else:
            return JsonResponse({"message": "Method not allowed"}, status=401)
    else:
        return JsonResponse({"message": "Request Not Allowed"}, status=401)


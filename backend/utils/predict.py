from django.core.files.storage import FileSystemStorage
from . import formatting
from . import watson_client
from django.conf import settings

import pandas as pd
import requests

DEPLOYMENT_UID = settings.DEPLOYMENT_UID
APIKEY = settings.APIKEY
INSTANCE_ID = settings.INSTANCE_ID
AUTHENTICATION_TOKEN_URL = settings.AUTHENTICATION_TOKEN_URL
SCORING_URL = settings.SCORING_URL


client = watson_client.get_watson_client()

def get_file_predictions(filename):
  fs = FileSystemStorage()
  file_path = fs.path(filename)
  df = pd.read_csv(file_path)
  fs.delete(filename)
  id_df = pd.DataFrame()
  if 'id' in df.columns:
    id_df['id'] = df['id']
    df.drop('id', axis=1, inplace=True)
  payload = formatting.get_scoring_payload(df)

  scoring_payload = {client.deployments.ScoringMetaNames.INPUT_DATA: [payload]}

  result = client.deployments.score(DEPLOYMENT_UID, scoring_payload)
  id_dict = id_df.to_dict()
  ids = [id_dict['id'][x] for x in id_dict['id']]
  
  return {"id": ids, "predictions": result['predictions']}

def get_predictions(data):
  payload = formatting.get_scoring_payload(data)
  scoring_payload = {client.deployments.ScoringMetaNames.INPUT_DATA: [payload]}
  predictions = client.deployments.score(DEPLOYMENT_UID, scoring_payload)
  return predictions

def get_endpoint_predictions(data):
            #  Get Authentication token
  headers = {"content-type": "application/x-www-form-urlencoded"}
  payload = {
      "grant_type": "urn:ibm:params:oauth:grant-type:apikey", "apikey": APIKEY}
  token_res = requests.post(
      AUTHENTICATION_TOKEN_URL, headers=headers, data=payload)
  token = token_res.json()['access_token']

  # Predict the num_orders
  predict_headers = {'Content-Type': 'application/json',
                      "Authorization": "Bearer "+token, "ML-Instance-ID": INSTANCE_ID}
  scoring_payload = formatting.get_scoring_payload(data)
  predict_res = requests.post(
      SCORING_URL, headers=predict_headers, json=scoring_payload)

  return predict_res.json()


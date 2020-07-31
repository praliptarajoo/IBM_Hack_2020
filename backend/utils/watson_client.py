from django.conf import settings
from watson_machine_learning_client import WatsonMachineLearningAPIClient

def get_watson_client():
  wml_credentials = {
    "apikey": settings.APIKEY,
    "iam_apikey_description": "Auto-generated for key 692bdd58-8640-4cba-a350-e09c2cdff284",
    "iam_apikey_name": "Service credentials-1",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/19854af9b0b64470afa45df27dda27a5::serviceid:ServiceId-44f19be1-dd11-440c-86ac-bbb52552c780",
    "instance_id": settings.INSTANCE_ID,
    "url": "https://eu-gb.ml.cloud.ibm.com"
  }
  client = WatsonMachineLearningAPIClient(wml_credentials)
  return client
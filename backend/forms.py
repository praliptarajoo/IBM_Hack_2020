from django import forms


class Data_form(forms.Form):
    week = forms.CharField()
    center_id = forms.CharField()
    meal_id = forms.CharField()
    checkout_price = forms.CharField()
    base_price = forms.CharField()
    emailer_for_promotion = forms.CharField()
    homepage_featured = forms.CharField()


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()
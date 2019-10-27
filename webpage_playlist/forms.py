from django.forms import ModelForm
from .models import UserUrl

class UrlForm(ModelForm):
    class Meta:
        model=UserUrl
        fields = ['user_url']
from django.shortcuts import render
from django.views.generic import CreateView
from django.core.files.base import ContentFile

from django.views import View
import requests as cf_request
import urllib.request

from .forms import UrlForm
from .models import UserUrl, UserWebpage

# Create your views here.
class UrlSubmission(View):
    form_class = UrlForm
    template_name = 'webpageplaylist/url_submission.html'

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name,{'form':form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            userurl = UserUrl()
            userurl.user_url = form.cleaned_data['user_url']
            userurl.user = request.user
            userurl.save()

            get_html = cf_request.get(form.cleaned_data['user_url'])
            get_html = get_html.text


            userwebpage = UserWebpage()
            userwebpage.user = request.user
            userwebpage.user_html.save('test4.html', ContentFile(get_html))
            h = userwebpage.user_html
            userwebpage.save()
            return render(request, template_name="webpageplaylist/user_webpage.html", context={'user_webpage':h})
            # return render(request, template_name="webpageplaylist/user_webpage.html")

class UseWebpage(View):

    def get(self, request, *args, **kwargs):
        user_recent_record = UserWebpage.objects.filter(user=request.user).order_by('-id')[0]
        user_html = user_recent_record.html
        return render(request=request, template_name=user_html)
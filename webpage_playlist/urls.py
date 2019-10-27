from django.urls import path


from .views import UrlSubmission, UseWebpage

app_name = "webpageplaylist"

urlpatterns = [

    path('url_submission/', UrlSubmission.as_view(), name='url_sub' ),
    path('user_webpage/', UseWebpage.as_view(), name='use_webpage')
]
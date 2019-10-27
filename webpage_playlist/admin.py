from django.contrib import admin
from .models import UserWebpage, UserUrl, UserSongs

# Register your models here.
admin.site.register(UserWebpage)
admin.site.register(UserUrl)
admin.site.register(UserSongs)

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class UserUrl(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_url = models.TextField()
    submission_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_url

class UserWebpage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_html = models.FileField(upload_to='media/')


    def __str__(self):
        return str(self.user)

class UserSongs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.TextField()
    song = models.TextField()

    def __str__(self):
        return self.song







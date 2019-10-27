from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    # user_name = models.CharField(max_length=255)
    # email = models.EmailField()
    pass


    def __str__(self):
        return self.email
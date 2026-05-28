from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"        # login with email instead of username
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

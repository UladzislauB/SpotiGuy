from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    CLIENT = 1
    ARTIST = 2
    EDITOR = 3
    ROLE_CHOICES = [
        (CLIENT, 'Client'),
        (ARTIST, 'Artist'),
        (EDITOR, 'Editor')
    ]

    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=CLIENT)

    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

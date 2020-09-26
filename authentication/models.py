from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField


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
    recently_played = ArrayField(
        ArrayField(
            models.CharField(max_length=10),
            size=2
        ),
        blank=True,
        size=8,
        default=list
    )

    playlist_queue_id = models.IntegerField(default=None, null=True)
    current_song = models.PositiveSmallIntegerField(default=None, null=True)

    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

from django.db import models
from authentication.models import User


class Album(models.Model):
    class Meta:
        ordering = ['-added_at']

    added_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=128)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='album_covers/%Y/%m/%d/')

    def count_songs(self):
        return self.song_set.count()

    def __str__(self):
        return self.name


class Song(models.Model):
    class Meta:
        ordering = ['-added_at']

    added_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=128)
    duration = models.DurationField()
    lyrics = models.TextField()
    album = models.ForeignKey(Album, on_delete=models.CASCADE)

    def duration_pretty(self):
        return f'{self.duration.min}:{self.duration.seconds % 60}'

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=64)
    background_color = models.CharField(max_length=16)

    def __str__(self):
        return self.name


class Playlist(models.Model):
    class Meta:
        ordering = ['-added_at']

    added_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=64)
    description = models.TextField()
    songs = models.ManyToManyField(Song)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='playlist_covers/%Y/%m/%d/')
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def count_songs(self):
        return self.songs.count()

    def total_duration(self):
        self.songs.values('duration')

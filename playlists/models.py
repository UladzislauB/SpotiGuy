from django.db import models

from authentication.models import User


class Album(models.Model):
    class Meta:
        ordering = ['-added_at']

    added_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=128)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='album_covers/%Y/%m/%d/')

    def count_songs(self):
        return self.song_set.count()

    def __str__(self):
        return self.name + ' - ' + self.owner.username


class Song(models.Model):
    class Meta:
        ordering = ['-added_at']

    added_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=128)
    song_duration = models.DurationField()
    listenings = models.IntegerField(default=0)
    lyrics = models.TextField(blank=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    audio_file = models.FileField(upload_to='audio/%Y/%m/%d/', null=True)

    def __str__(self):
        return self.name + ' - ' + self.album.owner.username


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

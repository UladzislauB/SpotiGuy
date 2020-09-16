from rest_framework import serializers
from playlists.models import Song


class SongSerializer(serializers.HyperlinkedModelSerializer):
    album_name = serializers.ReadOnlyField(source='album.name')

    class Meta:
        model = Song
        fields = ['id', 'added_at', 'name', 'listenings', 'album_name', 'duration', '_audio_file']

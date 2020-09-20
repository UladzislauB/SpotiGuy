from rest_framework import serializers

from playlists.models import Song, Playlist, Genre, Album
from authentication.models import User


class SongSerializer(serializers.Serializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    added_at = serializers.DateTimeField(read_only=True)
    name = serializers.CharField(max_length=128)
    lyrics = serializers.CharField(allow_blank=True, required=False, style={'base_template': 'textarea.html'})
    listenings = serializers.IntegerField(read_only=True)
    album = serializers.PrimaryKeyRelatedField(queryset=Album.objects.all())
    song_duration = serializers.DurationField()
    audio_file = serializers.FileField(allow_null=True, max_length=100, required=False)

    def validate_album(self, value):
        if value.owner != self.context['request'].user:
            raise serializers.ValidationError("Current user isn't author of album")
        return value

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.lyrics = validated_data.get('lyrics', instance.lyrics)
        instance.album = validated_data.get('album', instance.lyrics)
        instance.song_duration = validated_data.get('song_duration', instance.song_duration)
        instance.audio_file = validated_data.get('audio_file', instance.audio_file)
        return instance

    def create(self, validated_data):
        return Song.objects.create(**validated_data)

    def save(self, **kwargs):
        super(SongSerializer, self).save(**kwargs)


class AlbumSerializer(serializers.Serializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    added_at = serializers.DateTimeField(read_only=True)
    name = serializers.CharField(max_length=128)
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    image = serializers.ImageField(max_length=100)
    # song_set = serializers.HyperlinkedRelatedField(view_name='song-detail', queryset=Song.objects.all(), source='song_set')

    def create(self, validated_data):
        return Album.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.name = validated_data.get('name', instance.name)
        return instance

    def save(self, **kwargs):
        user = kwargs['owner']
        if user.role == User.CLIENT:
            raise serializers.ValidationError('Current user is not an artist')
        super(AlbumSerializer, self).save(**kwargs)


class PlaylistSerializer(serializers.Serializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    added_at = serializers.DateTimeField(read_only=True)
    name = serializers.CharField(max_length=64)
    image = serializers.ImageField(max_length=100)
    genre = serializers.HyperlinkedRelatedField(queryset=Genre.objects.all(), view_name='genre-detail')
    songs = serializers.HyperlinkedRelatedField(allow_empty=False, many=True,
                                                view_name='song-detail', read_only=True)
    description = serializers.CharField(style={'base_template': 'textarea.html'})
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.genre = validated_data.get('genre', instance.genre)
        return instance

    def create(self, validated_data):
        return Playlist.objects.create(**validated_data)


class GenreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'background_color']

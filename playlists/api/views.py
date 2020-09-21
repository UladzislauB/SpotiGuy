from rest_framework import permissions
from rest_framework import viewsets

from playlists.models import Song, Playlist, Genre, Album
from .serializers import SongSerializer, PlaylistSerializer, GenreSerializer, AlbumSerializer
from .permissions import IsOwnerOrReadOnly, IsOwnerOrReadCreateOnly, IsAdminUserOrReadOnly


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticated]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadCreateOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permissions = [IsAdminUserOrReadOnly]

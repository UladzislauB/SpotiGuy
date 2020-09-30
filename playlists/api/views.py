from rest_framework import permissions, status
from rest_framework import viewsets
from rest_framework.response import Response
import json

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

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        draft_request_data = self.request.data.copy()
        if len(draft_request_data) != 0:
            songs = json.loads(self.request.data['songs'])
            draft_request_data.pop('songs')
            for elem in songs:
                draft_request_data.update({'songs': elem})
            kwargs["data"] = draft_request_data
        return serializer_class(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permissions = [IsAdminUserOrReadOnly]

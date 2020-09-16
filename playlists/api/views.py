from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets

from playlists.models import Song
from .serializers import SongSerializer

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
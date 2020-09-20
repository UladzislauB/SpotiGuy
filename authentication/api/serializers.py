from rest_framework import serializers

from authentication.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'added_at', 'username', 'first_name', 'last_name', 'email', 'role', 'updated_at',
                  'album_set']

from django.contrib.auth.hashers import make_password

from rest_framework import serializers

from authentication.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'added_at', 'email', 'password', 'username', 'first_name', 'last_name', 'role', 'updated_at',
                  'album_set', 'playlist_queue_id', 'current_song']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
            'role': {
                'read_only': True
            },
            'album_set': {
                'read_only': True
            },
            'email': {
                'required': True,
                'allow_blank': False
            }
        }

    def create(self, validated_data):
        """Create password out of raw data got from api request"""
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'email': 'This email already registered'})
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError({'username': 'Another user already has such username'})
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class UserLoginSerializer(serializers.Serializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )
    username = serializers.CharField()

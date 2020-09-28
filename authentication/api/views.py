from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.authtoken.views import Token

from .serializers import UserSerializer, UserLoginSerializer
from .permissions import ReadCreateOnly
from authentication.models import User


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [ReadCreateOnly]

    def perform_create(self, serializer):
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        if user:
            login(self.request, user)
            token, _ = Token.objects.get_or_create(user=user)

            return JsonResponse(
                {'token': token.key},
                status=201
            )


class Login(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data['password']
        username = serializer.validated_data['username']

        user = authenticate(password=password, username=username)

        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)

            return JsonResponse(
                {
                    'username': user.username,
                    'role': user.role,
                    'token': token.key
                },
                status=200
            )
        else:
            return JsonResponse(
                {
                    'password': 'There\'s no user with credentials '
                                'provided or password is incorrect'
                },
                status=400
            )


class Logout(APIView):
    def post(self, request):
        Token.objects.get(user=request.user).delete()

        logout(request)

        return JsonResponse({
            'logout status': True
        })

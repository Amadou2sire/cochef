from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

User = get_user_model()

class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'username', 'phone_number', 'role', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'username': {'required': False},
        }

    def create(self, validated_data):
        first_name = validated_data.get('first_name', '')
        last_name = validated_data.get('last_name', '')

        user = User.objects.create_user(
            username=validated_data.get('username') or validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            role=validated_data.get('role', 'client'),
            first_name=first_name,
            last_name=last_name
        )
        return user


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

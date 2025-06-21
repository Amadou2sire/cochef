from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # Indique que l'identifiant est email

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email is None or password is None:
            raise serializers.ValidationError('Email et mot de passe sont requis')

        # Authentifie l'utilisateur avec email en tant que username
        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError('Identifiants invalides')

        # Injecte 'username' dans attrs (attendu par super) et appelle la validation parent
        attrs['username'] = email
        return super().validate(attrs)

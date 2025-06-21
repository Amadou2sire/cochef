from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import HeroBanner
from .models import FeatureSection
from .models import Menu, Event
from .models import ChefOfTheWeek
from .models import AboutSection

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

# Banner
class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBanner
        fields = [
            "id", "title", "description", "media_type", "media_file", "is_active",
            "primary_button_label", "primary_button_url",
            "secondary_button_label", "secondary_button_url"
        ]
        
# Featuresection
class FeatureSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureSection
        fields = "__all__"
        
# Menus
class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'
        
# Event
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        
# Chef
class ChefOfTheWeekSerializer(serializers.ModelSerializer):
    specialties = serializers.SerializerMethodField()

    class Meta:
        model = ChefOfTheWeek
        fields = ['name', 'image', 'bio', 'specialties', 'quote']

    def get_specialties(self, obj):
        return obj.get_specialties_list()
    
# About
class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = '__all__'
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework import generics
from .models import HeroBanner
from .serializers import HeroBannerSerializer

from rest_framework.generics import ListAPIView
from .models import FeatureSection
from .serializers import FeatureSectionSerializer

from .models import Menu
from .serializers import MenuSerializer

from .models import Event
from .serializers import EventSerializer

from .models import ChefOfTheWeek
from .serializers import ChefOfTheWeekSerializer

from .models import AboutSection
from .serializers import AboutSectionSerializer

from rest_framework import viewsets, permissions
from .models import Order
from .serializers import OrderSerializer

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


#banner 
class HeroBannerList(generics.ListAPIView):
    queryset = HeroBanner.objects.filter(is_active=True)
    serializer_class = HeroBannerSerializer
    
# Featuresection
class FeatureSectionListView(ListAPIView):
    serializer_class = FeatureSectionSerializer

    def get_queryset(self):
        return FeatureSection.objects.filter(is_active=True)
    
# Menus
class MenuListAPIView(generics.ListAPIView):
    queryset = Menu.objects.filter(is_active=True)
    serializer_class = MenuSerializer
    
class MenuDetailAPIView(generics.RetrieveAPIView):
    queryset = Menu.objects.filter(is_active=True)
    serializer_class = MenuSerializer    
    
# Event
class ActiveEventListView(generics.ListAPIView):
    queryset = Event.objects.filter(is_active=True).order_by('date')
    serializer_class = EventSerializer
    
# chef
class ChefOfTheWeekView(generics.ListAPIView):
    queryset = ChefOfTheWeek.objects.filter(is_active=True).order_by('-created_at')[:1]
    serializer_class = ChefOfTheWeekSerializer
    
    
# About
class AboutSectionView(generics.ListAPIView):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer

# commande
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Pour que l'utilisateur ne voit que ses commandes
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # On associe la commande à l'utilisateur connecté automatiquement
        serializer.save(user=self.request.user)
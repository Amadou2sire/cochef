from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, CustomTokenObtainPairView
from .views import HeroBannerList
from .views import FeatureSectionListView
from .views import MenuListAPIView, ActiveEventListView,ChefOfTheWeekView, AboutSectionView


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # login par email
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('hero-banners/', HeroBannerList.as_view(), name='hero-banner-list'),
    path('feature-section/', FeatureSectionListView.as_view(), name='feature-section'),
    path('menus/', MenuListAPIView.as_view(), name='menu-list'),
    path('events/', ActiveEventListView.as_view(), name='event-list'),
    path("chef-of-the-week/", ChefOfTheWeekView.as_view(), name="chef-of-the-week"),
    path('about-section/', AboutSectionView.as_view(), name='about-section'),
]

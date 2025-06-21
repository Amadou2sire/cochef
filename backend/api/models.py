from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'email est requis")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if not extra_fields.get('is_staff'):
            raise ValueError("Le superutilisateur doit avoir is_staff=True.")
        if not extra_fields.get('is_superuser'):
            raise ValueError("Le superutilisateur doit avoir is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True)

    # Champs nom et prénom explicitement déclarés (optionnel mais clair)
    first_name = models.CharField("Prenom", max_length=150, blank=True)
    last_name = models.CharField("Nom", max_length=150, blank=True)

    ROLE_CHOICES = (
        ('client', 'Client'),
        ('chef', 'Chef'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Vide car email est le login principal

    objects = CustomUserManager()

    def __str__(self):
        return self.email

# Bannière
class HeroBanner(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Vidéo (.mp4)'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES, default='image')
    media_file = models.FileField(upload_to='hero/', help_text="Image (.jpg, .png) ou vidéo (.mp4)")
    
    # Bouton principal
    primary_button_label = models.CharField(max_length=100, blank=True)
    primary_button_url = models.URLField(blank=True)
    
    # Bouton secondaire
    secondary_button_label = models.CharField(max_length=100, blank=True)
    secondary_button_url = models.URLField(blank=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({'Actif' if self.is_active else 'Inactif'})"

#Featuresection
class FeatureSection(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    button_label = models.CharField(max_length=100, blank=True)
    button_url = models.URLField(blank=True)
    image_1 = models.ImageField(upload_to='features/')
    image_2 = models.ImageField(upload_to='features/')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title 

# Menus
class Menu(models.Model):
    CATEGORY_CHOICES = [
        ('special', 'Spécial semaine'),
        ('event', 'Événementiel'),
        ('classic', 'Classique'),
        ('kids', 'Enfant'),
        ('veggie', 'Végétarien'),
    ]

    DAY_CHOICES = [
        ('monday', 'Lundi'),
        ('tuesday', 'Mardi'),
        ('wednesday', 'Mercredi'),
        ('thursday', 'Jeudi'),
        ('friday', 'Vendredi'),
        ('saturday', 'Samedi'),
        ('sunday', 'Dimanche'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='menus/')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='classic')
    price = models.DecimalField(max_digits=7, decimal_places=3, default=0.000)  
    available_days = models.JSONField(help_text="Liste des jours disponibles ex: ['monday', 'friday']")
    is_new = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

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

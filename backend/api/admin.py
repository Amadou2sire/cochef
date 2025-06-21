from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, HeroBanner
from .models import FeatureSection
from .models import Menu
from .models import Event
from .models import ChefOfTheWeek
from .models import AboutSection
from .models import Order

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'username', 'first_name', 'last_name', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informations personnelles', {'fields': ('username', 'first_name', 'last_name', 'phone_number', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Dates importantes', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password1', 'password2', 'role', 'is_staff', 'is_active')}
        ),
    )
    
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)

# HeroBanner

@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'media_type', 'is_active', 'created_at')
    list_filter = ('media_type', 'is_active', 'created_at')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at',)

    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'media_type', 'media_file', 'is_active')
        }),
        ('Boutons', {
            'fields': ('primary_button_label', 'primary_button_url', 'secondary_button_label', 'secondary_button_url')
        }),
        ('Informations', {
            'fields': ('created_at',)
        }),
    )

# Feature section
@admin.register(FeatureSection)
class FeatureSectionAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active")
    list_filter = ("is_active",)

# Menu
@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'is_active', 'is_new', 'get_available_days_display', 'created_at')
    list_filter = ('category', 'is_active', 'is_new', 'available_days')
    search_fields = ('title', 'description')
    ordering = ('-created_at',)

    def get_available_days_display(self, obj):
        # Si available_days est un ManyToManyField vers un modèle Jour (exemple)
        # ou si tu utilises un ChoiceField avec plusieurs valeurs, adapte en fonction.
        
        # Ex ici, si available_days est un ManyToMany vers un modèle Day avec un champ 'name':
        # days = obj.available_days.all()
        # return ", ".join(day.name for day in days)
        
        # Si available_days est un ChoiceField avec valeurs multiples stockées sous forme de liste, adapte :
        
        # Exemple si c'est un champ JSON ou ArrayField
        if not obj.available_days:
            return "-"
        return ", ".join(obj.available_days)
    get_available_days_display.short_description = 'Jours disponibles'


# Event
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'is_active')
    list_filter = ('is_active', 'date')
    search_fields = ('title', 'description')
    ordering = ('-date',)
    
@admin.register(ChefOfTheWeek)
class ChefOfTheWeekAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name',)


# About
@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'button_label', 'button_url')
    search_fields = ('title',)
    
# Commande
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'menu', 'quantity', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'user__username', 'menu__title')
    ordering = ('-created_at',)
    readonly_fields = ('order_number', 'created_at')
    
# Gerante

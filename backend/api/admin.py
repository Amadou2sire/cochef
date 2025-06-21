from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

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

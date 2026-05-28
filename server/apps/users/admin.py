from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ["email", "username", "is_staff", "is_active"]
    list_filter = ["is_staff", "is_active"]
    search_fields = ["email", "username"]
    ordering = ["email"]

    fieldsets = [
        ("Login Info", {
            "fields": ["email", "username", "password"]
        }),
        ("Personal Info", {
            "fields": ["first_name", "last_name"]
        }),
        ("Permissions", {
            "fields": ["is_active", "is_staff", "is_superuser", "groups", "user_permissions"],
            "classes": ["collapse"]
        }),
        ("Important Dates", {
            "fields": ["last_login", "date_joined"],
            "classes": ["collapse"]
        }),
    ]
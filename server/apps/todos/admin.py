from django.contrib import admin
from .models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ["title", "user", "is_completed", "created_at"]
    list_display_links = ["title"]
    list_filter = ["is_completed", "created_at"]
    list_editable = ["is_completed"]
    search_fields = ["title", "user__email"]
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["-created_at"]
    list_per_page = 20
    date_hierarchy = "created_at"

    fieldsets = [
        ("Todo Info", {
            "fields": ["title", "description", "is_completed"]
        }),
        ("Ownership", {
            "fields": ["user"]
        }),
        ("Timestamps", {
            "fields": ["created_at", "updated_at"],
            "classes": ["collapse"]
        }),
    ]

    actions = ["mark_completed", "mark_incomplete"]

    @admin.action(description="Mark selected as completed")
    def mark_completed(self, request, queryset):
        queryset.update(is_completed=True)

    @admin.action(description="Mark selected as incomplete")
    def mark_incomplete(self, request, queryset):
        queryset.update(is_completed=False)

from django.apps import AppConfig


class TodosConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.todos"  # ← must be apps.todos not just todos

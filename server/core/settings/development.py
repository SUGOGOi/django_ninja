from .base import *
DEBUG = True

ALLOWED_HOSTS = ["localhost","127.0.0.1"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Print emails to console instead of sending them
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# CORS — allow frontend dev server
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",   # React default
    "http://localhost:5173",   # Vite default
]

CORS_ALLOW_CREDENTIALS = True  # ← required for cookies to work cross-origin
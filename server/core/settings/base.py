from pathlib import Path
import os
from dotenv import load_dotenv
from django.templatetags.static import static
from django.urls import reverse_lazy

load_dotenv()

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = os.getenv("SECRET_KEY")

ALLOWED_HOSTS = []

# Default Django apps + our apps
INSTALLED_APPS = [


    "corsheaders.middleware.CorsMiddleware",  # ← first!
    "django.middleware.security.SecurityMiddleware",


    # Unfold - must be before django.contrib.admin
    # "unfold",
    # "unfold.contrib.filters",
    # "unfold.contrib.forms",


    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",          # required by allauth

    # Third party
    "ninja",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",

    # Our apps (we'll create these next)
    "apps.users",
    "apps.todos",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",   # required by allauth
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

ASGI_APPLICATION = "core.asgi.application"

# Database - SQLite for now
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Allauth settings
SITE_ID = 1
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]
ACCOUNT_EMAIL_VERIFICATION = "none"    # change to "mandatory" in prod
LOGIN_REDIRECT_URL = "/"


# UNFOLD = {
#     "SITE_TITLE": "Djngo Ninja Todo",
#     "SITE_HEADER": "Django Ninja Todo",
#     "SITE_URL": "/",
#     "SITE_ICON": None,
#     "SITE_SYMBOL": "task_alt",   # Google Material icon
#     "SHOW_HISTORY": True,
#     "SHOW_VIEW_ON_SITE": True,
#     "COLORS": {
#         "primary": {
#             "50": "250 245 255",
#             "100": "243 232 255",
#             "200": "233 213 255",
#             "300": "216 180 254",
#             "400": "192 132 252",
#             "500": "168 85 247",
#             "600": "147 51 234",
#             "700": "126 34 206",
#             "800": "107 33 168",
#             "900": "88 28 135",
#             "950": "59 7 100",
#         },
#     },
#     # "SIDEBAR": {
#     #     "show_search": True,
#     #     "show_all_applications": True,
#     #     "navigation": [
#     #         {
#     #             "title": "Navigation",
#     #             "items": [
#     #                 {
#     #                     "title": "Dashboard",
#     #                     "icon": "dashboard",
#     #                     "link": reverse_lazy("admin:index"),
#     #                 },
#     #             ],
#     #         },
#     #         {
#     #             "title": "Todo App",
#     #             "collapsible": True,
#     #             "items": [
#     #                 {
#     #                     "title": "Users",
#     #                     "icon": "people",
#     #                     "link": reverse_lazy("admin:auth_user_changelist"),
#     #                 },
#     #                 {
#     #                     "title": "Todos",
#     #                     "icon": "task_alt",
#     #                     "link": reverse_lazy("admin:todos_todo_changelist"),
#     #                 },
#     #             ],
#     #         },
#     #         {
#     #             "title": "Auth & Social",
#     #             "collapsible": True,
#     #             "items": [
#     #                 {
#     #                     "title": "Social Accounts",
#     #                     "icon": "link",
#     #                     "link": reverse_lazy("admin:socialaccount_socialaccount_changelist"),
#     #                 },
#     #                 {
#     #                     "title": "Social Apps",
#     #                     "icon": "apps",
#     #                     "link": reverse_lazy("admin:socialaccount_socialapp_changelist"),
#     #                 },
#     #             ],
#     #         },
#     #     ],
#     # },



#     "SIDEBAR": {
#     "show_search": True,
#     "show_all_applications": True,
#     "navigation": [
#         {
#             "title": "Navigation",
#             "items": [
#                 {
#                     "title": "Dashboard",
#                     "icon": "dashboard",
#                     "link": reverse_lazy("admin:index"),
#                 },
#             ],
#         },
#         {
#             "title": "Auth & Social",
#             "collapsible": True,
#             "items": [
#                 {
#                     "title": "Social Accounts",
#                     "icon": "link",
#                     "link": reverse_lazy("admin:socialaccount_socialaccount_changelist"),
#                 },
#                 {
#                     "title": "Social Apps",
#                     "icon": "apps",
#                     "link": reverse_lazy("admin:socialaccount_socialapp_changelist"),
#                 },
#             ],
#         },
#     ],
# },
# }

AUTH_USER_MODEL = "users.User"
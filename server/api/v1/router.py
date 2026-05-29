from ninja import NinjaAPI
from apps.todos.api import router as todos_router
from apps.users.api import router as auth_router

api = NinjaAPI(
    title="Todo API",
    version="1.0.0",
    description="Todo app API built with Django Ninja",
)

api.add_router("/auth", auth_router)
api.add_router("/todos", todos_router)
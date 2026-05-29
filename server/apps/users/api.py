from ninja import Router
from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest
from .schemas import RegisterIn, LoginIn, UserOut
from .models import User

router = Router(tags=["Auth"])


@router.post("/register", response={201: UserOut, 400:dict})
def register(request: HttpRequest, payload: RegisterIn):
    #check if email already exists
    if User.objects.filter(email = payload.email).exists():
        return 400, {"message":"Email already registered"}
    
    user = User.objects.create_user(
        email=payload.email,
        username=payload.username,
        password=payload.password,
    )
    return 201, user



@router.post("/login", response={200: UserOut, 401:dict})
def use_login(request: HttpRequest, payload: LoginIn):
    user = authenticate(
        request,
        email=payload.email,
        password=payload.password
    )
    if user is None:
        return 401, {"message":"Invalid email or password"}
    
    login(request, user)
    return 200, user

@router.post("/logout", response={200: dict})
def user_logout(request: HttpRequest):
    logout(request)
    return 200, {"message":"Logged out successfully"}

@router.get("/me", response={200: UserOut, 401: dict})
def me(request: HttpRequest):
    if not request.user.is_authenticated:
        return 401, {"error": "Not authenticated"}
    return 200, request.user

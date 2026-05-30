from ninja import Router
from django.contrib.auth import authenticate, logout
from django.http import HttpRequest, HttpResponse
from .schemas import RegisterIn, LoginIn, UserOut,TokenOut
from .models import User
from .utils import create_access_token
import json
from .auth import CookieAuth

router = Router(tags=["Auth"])


@router.post("/register")
def register(request: HttpRequest, payload: RegisterIn):
    #check if email already exists
    if User.objects.filter(email = payload.email).exists():
        return HttpResponse(
            json.dumps({"message": "Email already registered"}),
            content_type="application/json",
            status=400
        )
    
    user = User.objects.create_user(
        email=payload.email,
        username=payload.username,
        password=payload.password,
    )
    token = create_access_token(user)


    response = HttpResponse(
        json.dumps({"id":user.pk, "email":user.email, "username":user.username}),
        content_type="application/json",
        status=201
    )
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,       # JS cannot access this
        secure=False,        # True in production (HTTPS only)
        samesite="Lax",      # CSRF protection
        max_age=7 * 24 * 60 * 60,  # 7 days in seconds
    )
    return response



@router.post("/login")
def use_login(request: HttpRequest, payload: LoginIn):
    user = authenticate(
        request,
        email=payload.email,
        password=payload.password
    )
    if user is None:
        return HttpResponse(
            json.dumps({"message": "Invalid email or password"}),
            content_type="application/json",
            status=401
        )
    
    token = create_access_token(user)
    response = HttpResponse(
        json.dumps({"id": user.pk, "email": user.email, "username": user.username}),
        content_type="application/json",
        status=200
    )
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,        # set True in production
        samesite="Lax",
        max_age=7 * 24 * 60 * 60,
    )
    return response

@router.post("/logout")
def user_logout(request: HttpRequest):
    response = HttpResponse(
        json.dumps({"message": "Logged out successfully"}),
        content_type="application/json",
        status=200
    )
    response.delete_cookie("access_token")
    return response

@router.get("/me",auth=CookieAuth(), response={200: UserOut, 401: dict})
def me(request: HttpRequest):
    return 200, getattr(request, "auth")

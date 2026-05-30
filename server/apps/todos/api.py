from ninja import Router
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from .models import Todo
from .schemas import TodoIn, TodoOut, TodoUpdateIn
from apps.users.auth import CookieAuth

router = Router(tags=["Todos"], auth=CookieAuth())


def auth_required(request: HttpRequest):
    return request.user.is_authenticated

@router.get("/", response={200: list[TodoOut], 401: dict})
def list_todos(request: HttpRequest):
    todos = Todo.objects.filter(user=request.user)
    return 200, list(todos)


@router.post("/", response={201: TodoOut, 401:dict})
def create_todo(request: HttpRequest, payload: TodoIn):
    todo = Todo.objects.create(
        user=request.user,
        title=payload.title,
        description=payload.description,
        is_completed=payload.is_completed,
    )
    return 201, todo


@router.get("/{todo_id}", response={200: TodoOut, 401: dict, 404: dict})
def get_todo(request: HttpRequest, todo_id: int):
    todo = get_object_or_404(Todo, id=todo_id, user=request.user)
    return 200, todo

@router.patch("/{todo_id}", response={200: TodoOut, 401: dict, 404: dict})
def update_todo(request: HttpRequest, todo_id: int, payload: TodoUpdateIn):
    todo = get_object_or_404(Todo, id=todo_id, user=request.user)

    # only update fields that were actually sent
    if payload.title is not None:
        todo.title = payload.title
    if payload.description is not None:
        todo.description = payload.description
    if payload.is_completed is not None:
        todo.is_completed = payload.is_completed

    todo.save()
    return 200, todo
        


@router.delete("/{todo_id}", response={200: dict, 401: dict, 404: dict})
def delete_todo(request:HttpRequest, todo_id:int):
    todo = get_object_or_404(Todo, id=todo_id, user=request.user)
    todo.delete()
    return 200, {"message":"Todo deleted"}
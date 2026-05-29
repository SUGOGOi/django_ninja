from ninja import Schema
from datetime import datetime


class TodoIn(Schema):
    title: str
    description: str=""
    is_completed: bool = False

class TodoOut(Schema):
    id: int
    title: str
    description: str
    is_completed: bool
    created_at: datetime
    updated_at: datetime

class TodoUpdateIn(Schema):
    title: str | None = None
    description: str | None = None
    is_completed: bool | None = None
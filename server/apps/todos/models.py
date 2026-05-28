from django.db import models
from apps.users.models import User


class Todo(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,    # delete todos when user is deleted
        related_name="todos"
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]   # newest first by default

    def __str__(self):
        return self.title

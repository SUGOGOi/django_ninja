from datetime import datetime , timedelta
from jose import jwt 
import os
from typing import Any

SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key")

def create_access_token(user: Any) -> str:
    # print(user.__dict__)
    payload = {
        "user_id":user.pk,
        "exp": datetime.utcnow() + timedelta(days=7),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
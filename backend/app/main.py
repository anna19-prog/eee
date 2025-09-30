from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware

from app.auth import fastapi_users, jwt_authentication
from app.database import engine, Base
from app.models import User

Base.metadata.create_all(bind=engine) # создает базы

app = FastAPI(title="English Exam Elixir API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "meow meow meow meow"}


@app.get("/protected")
async def protected_route(user: User = Depends(fastapi_users.current_user())):
    return {"message": f"Hello {user.email}", "user_id": user.id}

@app.get("/auth/check")
async def check_auth(user: User = Depends(fastapi_users.current_user(optional=True))):
    if user:
        return {"authenticated": True, "user": user.email}
    return {"authenticated": False}

# Регистрируем endpoints аутентификации
app.include_router(
    fastapi_users.get_auth_router(jwt_authentication),
    prefix="/auth/jwt",
    tags=["auth"]
)

app.include_router(
    fastapi_users.get_register_router(),
    prefix="/auth",
    tags=["auth"]
)

app.include_router(
    fastapi_users.get_users_router(),
    prefix="/users",
    tags=["users"]
)

# Endpoint для проверки здоровья API
@app.get("/api/")
async def api_root():
    return {"message": "Welcome to English Exam Elixir API"}
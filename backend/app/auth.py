from fastapi_users.authentication import JWTAuthentication
from fastapi_users import FastAPIUsers
from app.models import User
from app.database import SessionLocal

SECRET = "your-secret-key"  # Измените на случайный секретный ключ

# jwt - json web token
jwt_authentication = JWTAuthentication(
    secret=SECRET, 
    lifetime_seconds=3600,
    tokenUrl="/auth/jwt/login"
)

# Функция для получения пользователя из базы данных
def get_user_db():
    yield SQLAlchemyUserDatabase(User, SessionLocal())

# Настройка FastAPI Users
fastapi_users = FastAPIUsers(
    get_user_db,
    [jwt_authentication],
    User,
    None,  # UserCreate model
    None,  # UserUpdate model
    None,  # UserDB model
)
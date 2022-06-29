from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()


class CommonSettings(BaseModel):
    """
    Common settings for app
    """
    APP_NAME: str = "SmartFit"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = "AI fitness app"
    APP_AUTHOR: str = "Talsag"
    DEBUG_MODE: bool = True


class ServerSettings(BaseModel):
    """
    Server settings for app
    """
    SERVER_HOST: str = "0.0.0.0"
    SERVER_PORT: int = int(os.environ.get('SERVER_PORT')) if os.environ.get('SERVER_PORT') else 8070
    API_V1_STR: str = "api/api_v1"

class DatabaseSettings(BaseModel):
    """
    Database settings for app
    """
    DEV_MODE: bool = os.getenv("DEV_MODE")
    DATABASE_USER: str = os.getenv("MONGO_INITDB_USER")
    DATABASE_PASSWORD: str = os.getenv("MONGO_INITDB_PWD")
    DATABASE_HOST: str = os.getenv("DATABASE_HOST")
    DATABASE_PORT: str = os.getenv("DOCKER_DB_PORT")
    DB_NAME: str = os.getenv("MONGO_INITDB_DATABASE")
    DATABASE_URL_IN_PROD:str = "mongodb://{user}:{password}@{host}:{port}/{db}".format(user=DATABASE_USER, password=DATABASE_PASSWORD, host=DATABASE_HOST, port=DATABASE_PORT,db=DB_NAME)
    DATABASE_URL_IN_DEV :str = "mongodb+srv://Talsag:288944@cluster0.n8bbj.mongodb.net/?retryWrites=true&w=majority"
    DATABASE_URL = DATABASE_URL_IN_DEV if DEV_MODE else DATABASE_URL_IN_PROD

    EMAIL_TEST_USER:str = 'example@exa.com'
    PASSWORD_TEST_USER:str = 'example'
    FULL_NAME_TEST_USER:str =  "Test"
    TEST_USER_ID:str = '5844f810-873d-41e7-9290-2e679f0769d4'



class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    """
    Settings for app
    """
    pass


settings = Settings()

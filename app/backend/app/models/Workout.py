from typing import List
import uuid
from pydantic import BaseModel, EmailStr, Field
from models.Exercise import Exercise


class WorkoutBase(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    user_id: str = Field(..., description="User id")


class WorkoutUpdate(BaseModel):
    number_of_days_per_week: int = Field(default=0)
    exercises: List[Exercise] = Field(default=[])
    split:str = Field(default="")
    
    class Config:
        schema_extra = {
            "number_of_days_per_week": "3",
            "exercises": [
                {
                        "bodyPart": "waist",
                        "equipment": "body weight",
                        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
                        "id": "0001",
                        "name": "3/4 sit-up",
                        "target": "abs",
                        "alternatives": ["1512", "0002", "0003"],
                        "favorite": "False",
                }
            ],
        }


class Workout(WorkoutBase, WorkoutUpdate):

    class Config:
        schema_extra = {
            "example": {
                "id": '000ssf-0s0s0v0-s0v0v0a0-0s0s0s0s0-0s0s0s0s0',
                'user_id': '1a09bd7c-bb7e-4382-910f-dfe6f279c55f',
                "number_of_days_per_week": "3",
                "exercises": [
                                          {  "bodyPart": "waist",
                        "equipment": "body weight",
                        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
                        "id": "0001",
                        "name": "3/4 sit-up",
                        "target": "abs",
                        "alternatives": ["1512", "0002", "0003"],
                        "favorite": "False",}
                ],

            }
        }

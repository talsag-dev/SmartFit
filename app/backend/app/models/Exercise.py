from __future__ import annotations
from email.policy import default
from typing import List, Optional, Union
from uuid import UUID
from pydantic import BaseModel, Field, conlist
import uuid


class Exercise(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    alternatives: conlist(str, unique_items=True)=[] # alternatives for the exercise by id
    favorite: Optional[bool] = None 
    target: Union[List[str],str] = None
    equipment: Optional[str] = None,
    gifUrl: Optional[str] = None,
    bodyPart: Optional[str] = None,
    number_of_reps: Optional[int] = None,
    number_of_sets: Optional[int] = None,

    class Config:
        schema_extra = {
            "example": {
                "bodyPart": "waist",
                "equipment": "body weight",
                "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
                "id": "0001",
                "name": "3/4 sit-up",
                "target": "abs",
                "alternatives": ["1512", "0002", "0003"],
                "favorite": "False",
            }
        }

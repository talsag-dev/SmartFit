from fastapi import APIRouter, Body, HTTPException, status
from models.Food import Food
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from db import db
import requests


router = APIRouter()


headers = {
	"x-app-id": "949d0b08",
	"x-app-key": "42f94bcd6cc55c06e22463f39a34d598",
    "x-remote-user-id":'0'
}
base_url = 'https://trackapi.nutritionix.com/v2/'


@router.post("/food", tags=["Food"], description='Get spesific food details')
def get_spesific_food(query:str) -> JSONResponse:
    try:
        food_list = requests.request('POST',base_url+'natural/nutrients',headers=headers,data={'query':query})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=food_list.json())
    except Exception as e:
        raise HTTPException(status_code=404, detail="food can't be found")



@router.post("/new", tags=["Food"], description='When one user wants to add a spesific food which isnt in the database')
async def post_one_food(food: Food = Body(...)) -> JSONResponse:
    food_data = jsonable_encoder(food)
    new_food_data = await db.get_collection("food").insert_one(food_data)
    created_food = await db.get_collection("food").find_one(
        {"_id": new_food_data.inserted_id}
    )
    if created_food is not None:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_food)
    raise HTTPException(
        status_code=404, detail=f"Food {food.id} couldnt be created")


# @router.delete("/api/api_v1/nutrition/food/{id}", tags=["Food"], description='delete food')
# async def del_food(id: str):
#     if (food := await db.get_collection("food").find_one({"_id": id})) is not None:
#         await db.get_collection("food").delete_one({"_id": id})
#         return HTTPException(
#             status_code=201, detail=f"food {id} deleted")
#     raise HTTPException(
#         status_code=404, detail=f"food {id} not found")
#
# thinking about deleting this endpoint because giving premisson for one user to delete food is wrong maybe
# only the food created by him

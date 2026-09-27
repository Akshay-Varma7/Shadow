from fastapi import APIRouter 

router = APIRouter()

@router.get("/",)#response_model
def get_chats():#request or body

@router.post("/",)
def create_chat():

@router.put("/",)
def update_chat():#lastUpdatedAt,latestCycle

#how async and why not awaits
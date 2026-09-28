from fastapi import APIRouter, Depends, 

from backend.db.session import SessionLocal
from backend.models.chat import ChatCheck #input validation
from backend.services.chat_service import ChatService

router = APIRouter()

def get_chat_service() -> ChatService:#
    return ChatService(session=SessionLocal())#dont want one service shared by every req

@router.get("/",response_model=list[ChatCheck])#response_model
def get_chats(service: ChatService = Depends(get_chat_service)):#when request Depends inside func defn runs
    return service.get_chats()

@router.post("/",response_model=ChatCheck)
def create_chat(service: ChatService = Depends(get_chat_service)):
    return service.create_chat()

# @router.put("/",)
# def update_chat():#lastUpdatedAt,latestCycle

#how async and why not awaits
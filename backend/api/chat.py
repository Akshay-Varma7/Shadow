from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.db.session import get_db
from backend.models.chat import ChatResponse
from backend.services.chat_service import ChatService

router = APIRouter()


def get_chat_service(
    db: Session = Depends(get_db),
) -> ChatService:
    return ChatService(session=db)


@router.get("/", response_model=list[ChatResponse])
def get_chats(
    service: ChatService = Depends(get_chat_service),
):
    return service.get_chats()


@router.post("/", response_model=ChatResponse)
def create_chat(
    service: ChatService = Depends(get_chat_service),
):
    return service.create_chat()
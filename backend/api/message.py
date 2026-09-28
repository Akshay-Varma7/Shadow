from fastapi import APIRouter, Depends

from backend.db.session import SessionLocal
from backend.models.message import 
from backend.services.message_service import MessageService

router = APIRouter()

def get_message_service() -> MessageService:
    return MessageService(session=SessionLocal())

@router.get("/{chat_id}",response_model=)#:chat_id
def get_messages(service: MessageService = Depends(get_message_service)):
    
    return service.

@router.post("/{chat_id}",response_model=)#store whole cycle in db
def create_message(service: MessageService = Depends(get_message_service)):

    return service.
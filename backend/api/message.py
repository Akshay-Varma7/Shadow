from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from langchain_core.messages import HumanMessage, AIMessage

from backend.db.session import get_db
from backend.db.schema import Role
from backend.models.message import MessageCreate, MessageResponse
from backend.services.message_service import MessageService
from backend.services.chat_service import ChatService
from backend.ai.chat import generate_reply

router = APIRouter()

def get_message_service(
    db: Session = Depends(get_db),
) -> MessageService:
    return MessageService(session=db)

def get_chat_service(
    db: Session = Depends(get_db),
) -> ChatService:
    return ChatService(session=db)

@router.get("/{chat_id}", response_model=list[MessageResponse])
def get_messages(
    chat_id: int,
    service: MessageService = Depends(get_message_service),
):
    return service.get_messages(chat_id)

@router.post("/{chat_id}", response_model=MessageResponse)
def create_message(
    chat_id: int,
    payload: MessageCreate,
    message_service: MessageService = Depends(get_message_service),
    chat_service: ChatService = Depends(get_chat_service),
):
    chat = chat_service.get_chat(chat_id)

    if chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")

    # 1. Allocate the next conversation cycle.
    cycle_id = chat.latest_cycle + 1
    chat.latest_cycle = cycle_id

    # 2. Persist the user's message.
    message_service.create_message(
        chat_id=chat_id,
        cycle_id=cycle_id,
        msg=payload.message,
        role=Role.USER,
    )

    # 3. Reconstruct history from previous completed cycles.
    previous_messages = message_service.get_messages(chat_id)
    history = []

    for message in previous_messages:
        if message.cycle_id >= cycle_id:
            continue

        if message.role == Role.USER:
            history.append(HumanMessage(content=message.message))
        elif message.role == Role.ASSISTANT:
            history.append(AIMessage(content=message.message))

    # 4. Generate the RAG response.
    result = generate_reply(
        question=payload.message,
        history=history,
    )

    # 5. Persist the AI reply in the same cycle.
    return message_service.create_message(
        chat_id=chat_id,
        cycle_id=cycle_id,
        msg=result.funny_response,
        role=Role.ASSISTANT,
        gif_url=result.gif_url or None,
    )

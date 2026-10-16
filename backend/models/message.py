from datetime import datetime

from pydantic import BaseModel, ConfigDict

class MessageCreate(BaseModel):
    message: str

class MessageResponse(BaseModel):
    message_id: int
    chat_id: int
    cycle_id: int
    message: str
    role: str
    gif_url: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)#?
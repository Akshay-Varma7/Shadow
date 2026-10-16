from pydantic import BaseModel, ConfigDict

class ChatResponse(BaseModel):
    chat_id: int
    title: str | None
    latest_cycle: int

    model_config = ConfigDict(from_attributes=True)#?

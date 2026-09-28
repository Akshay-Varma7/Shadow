from pydantic import BaseModel
#for req and res validation
class ChatCheck(BaseModel):#for both read and create
    chat_id: int
    title: str
    latest_cycle: int

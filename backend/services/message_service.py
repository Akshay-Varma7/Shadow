from sqlalchemy.orm import Session

from backend.db.schema import Message

class MessageService:
    def __init__(self,session: Session):
        self._db = session#_db means pvt var and instance var as not out hence not class attr 

    def get_messages(self) -> list[Message]:
        return self._db.query(Message).all()

    def create_message(self,chat_id: int,msg: str,role: str,gif_url: str|None) -> Message:
        new_message = Message()

        self._db.add(new_message)#for session to track the new obj
        self._db.flush()

        new_message.chat_id = chat_id
        new_message.message = msg
        new_message.role = role
        new_message.gif_url = gif_url

        self._db.commit()
        self._db.refresh(new_message)

        return new_message#cycle_id?

#here edit is actually copy msg and submit a new message
from sqlalchemy.orm import Session

from backend.db.schema import Chat

class ChatService:
    def __init__(self,session: Session):
        self._db = session#_db means pvt var and instance var as not out hence not class attr 

    def get_chats(self) -> list[Chat]:
        return self._db.query(Chat).all()

    # def get_chat(self,chat_id: int) -> Chat | None:
    #     return self._db.query(Chat).filter(Chat.chat_id == chat_id).first()#.first() - optimised

    def create_chat(self) -> Chat:
        new_chat = Chat()

        self._db.add(new_chat)#for session to track the new obj
        self._db.flush()#ensures chat_id retrival

        new_chat.title = f"new chat {new_chat.chat_id}"

        self._db.commit()
        self._db.refresh(new_chat)#extra db generated you want your Python object to reflect the actual DB state

        return new_chat
    #later dont commit handle from the higher level routes
    #also new chat just page and only after 1st msg sent created and title is changed and commit
        
    def update_chat(self,chat_id: int,new_cycle: int) -> Chat | None:#only cycle later rename
        chat = self.get_chat(chat_id)

        if not chat:
            return None

        chat.latest_cycle = new_cycle
        self._db.commit()
        self._db.refresh(chat)#incase any triggers

        return chat
    
#later:delete->fetch row and .delete(row) and also from messages
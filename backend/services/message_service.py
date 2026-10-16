
from sqlalchemy.orm import Session

from backend.db.schema import Message, Role


class MessageService:
    def __init__(self, session: Session):
        self._db = session

    def get_messages(self, chat_id: int) -> list[Message]:
        return (
            self._db.query(Message)
            .filter(Message.chat_id == chat_id)
            .order_by(Message.message_id.asc())
            .all()
        )

    def create_message(
        self,
        chat_id: int,
        cycle_id: int,#from
        msg: str,
        role: Role,
        gif_url: str | None = None,
    ) -> Message:
        new_message = Message(
            chat_id=chat_id,
            cycle_id=cycle_id,
            message=msg,
            role=role,
            gif_url=gif_url,
        )

        try:
            self._db.add(new_message)
            self._db.commit()
            self._db.refresh(new_message)
            return new_message
        except Exception:
            self._db.rollback()
            raise

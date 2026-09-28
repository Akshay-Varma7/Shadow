from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from datetime import datetime#python type
from zoneinfo import ZoneInfo
from enum import Enum

class Role(str,Enum):#2 inherits?-MessageRole.USER == "user" if not MessageRole.USER is a member of enum not string or value?
    USER = "user"#not dict for:
    SYSTEM = "system"

def now():
    return datetime.now(ZoneInfo("Asia/Kolkata"))

#or Base = DeclarativeBase()//the class whos instance is class?=A metaclass(source-type) is the class that creates classes
#a class is also an obj
class Base(DeclarativeBase):
    pass

class Chat(Base):
    __tablename__ = "Chat"#naming same as class

    chat_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) #optional
    title: Mapped[str | None] = mapped_column(nullable=True)#can change in st creation or msg 
    latest_cycle: Mapped[int] = mapped_column(default=0)

    #reverse relation
    messages: Mapped[list["Message"]] = relationship(#relation Table(not class)
        back_populates="chat"#relation attribute
    )

class Message(Base):
    __tablename__ = "Message"

    message_id: Mapped[int] = mapped_column(primary_key=True,autoincrement=True)
    chat_id: Mapped[int] = mapped_column(#1.1
        ForeignKey("Chat.chat_id")
    )
    cycle_id: Mapped[int] = mapped_column(nullable=False)#?
    message: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[Role] = mapped_column(
        SQLEnum(Role),
        nullable=False
    )
    gif_url: Mapped[str | None] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=now)#or 1st is type

    #relation
    chat: Mapped["Chat"] = relationship(#or 1st is tablename#1.2
        back_populates="messages"
    )
#1.1 and 1.2 in pointing side
#one in starting side: reverse relation
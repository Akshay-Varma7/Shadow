import { createContext , useContext , useState } from "react";

const ChatContext = createContext();//creates the shared communication channel(or rect comp).
const initial = [
    {
        chatId: 1,
        title: "greeting",
        lastupdatedAt: Date()
    },
    {
        chatId: 2,
        title: "universe origin",
        lastupdatedAt: Date()
    }
]
const initialM = [
    {   
        messageId: 1,
        chatId: 1,
        cycleId: 1,
        isPrompt: true,
        isResponse: false,
        message: "namaste bagunava",
        gifUrl: null,
        createdAt : Date()
    },
    {
        messageId: 2,
        chatId: 1,
        cycleId: 1,
        isPrompt: false,
        isResponse: true,
        message: "haa",
        gifUrl: "https://tenor.com/erD8tXJVW6o.gif",
        createdAt : Date()
    },
    {   
        messageId: 3,
        chatId: 2,
        cycleId: 1,
        isPrompt: true,
        isResponse: false,
        message: "what is universe made of?",
        gifUrl: null,
        createdAt : Date()
    },
    {
        messageId: 4,
        chatId: 2,
        cycleId: 1,
        isPrompt: false,
        isResponse: true,
        message: "Boss atoms",
        gifUrl: "https://tenor.com/erD8tXJVW6o.gif",
        createdAt : Date()
    }
]
export function ContextProvider({ children }) {//owns the shared state.
  const [chats, setChats] = useState(initial);//not []
  const [messages, setMessages] = useState(initialM);//not []

  const [currChatId, setCurrChatId] = useState(null);

  const value = {
    chats,
    setChats,
    messages,
    setMessages,
    currChatId,
    setCurrChatId,
  };

  return (
    <ChatContext.Provider value={value}> {/*.Provider = imp pattern*/}
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {//lets any descendant access that state.-in that file
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ContextProvider");
  }

  return context;
}
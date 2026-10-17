import { createContext , useContext , useState } from "react";

const ChatContext = createContext();//creates the shared communication channel(or rect comp).

export function ContextProvider({ children }) {//owns the shared state.
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

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
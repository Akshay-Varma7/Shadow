import Messages  from "../components/Messages";
import InputBox  from "../components/InputBox";
import { useParams } from "react-router-dom";
import { useChat } from "../components/Context";
//always maintain physical relation from children side not parent as deletion is easy
//layouts&routes-component/mui in layout + function-state and dup of states-link to core and be= then db and be if not-css

function ChatPage() {
    const { chatId } = useParams();
    const { messages, setMessages } = useChat();

    const visibleMessages = messages.filter(
        (m) => String(m.chatId) === String(chatId)
    );
    //not using useEffect now
    /*ATLEAST FOR MOCK: like atomic db- add to it and retrive for visible but state consists all */
    return (
        <>
            <Messages
                messages={visibleMessages} 
                setMessages={setMessages}
            />
            <InputBox
                chatId={chatId}
                messages={messages}
                setMessages={setMessages}
            />
        </>
    );
}

export default ChatPage;
import { NavLink } from "react-router-dom";
import { useEffect , Fragment } from "react";
import { useChat } from "../components/Context";

const BE_URL = import.meta.env.VITE_BE_URL;

function newChat(){
    const r = Math.floor(Math.random()*10000)+1
    return {
        chatId: r,
        title: `new chat ${r}`,//how?
        lastupdatedAt: Date()
    }
}
function SidePage(){
    const {
        chats,
        setChats,
        currChatId,
        setCurrChatId,//?
    } = useChat();
    async function getChats() {
        try {
            const response = await fetch(
                `http://${BE_URL}/get_chats`
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const finalRes = await response.json();
                setChats(finalRes);
        } catch (error) {
            console.warn("Backend unavailable; using local chats.", error);
            // Don't clear chats already created in frontend state.
        }
    }
    const click = (e)=>{
        e.preventDefault();
        setChats([...chats,newChat()])
    }
    //{}= currChatId
    useEffect(()=>{
        getChats();
    },[currChatId]);
    return(
        <>
            <button onClick={click}>New Chat</button>

            <nav>
                {
                    chats.map((c)=>(
                        <Fragment key={c.chatId}>
                        <NavLink 
                            to={`/chat/${c.chatId}`}
                        >
                            {c.title}
                        </NavLink>
                        <br />
                        </Fragment>
                    ))
                }
            </nav>
        </>
    )
}

export default SidePage;
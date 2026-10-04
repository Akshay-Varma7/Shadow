import { NavLink } from "react-router-dom";
import { useState , useEffect , Fragment } from "react";

from dotenv import load_dotenv
load_dotenv()
BE_URL = os.getenv("BE_URL")

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
function newChat(){
    const r = Math.floor(Math.random()*10000)+1
    return {
        chatId: r,
        title: `new chat ${r}`,//how?
        lastupdatedAt: Date()
    }
}
function SidePage(){
    const [chats,setChats] = useState(initial);
    const [currChatId,setCurrChatId] = useState();
    const getChats = async () =>{
        try{
            const res = await fetch(`${DB_URL}/get_chats`);
            const res = res.json();//as no mw like: express.json()
            const structureRes = res.map(chat =>({ chatId: chat.chat_id,chatTitle: chat.title}))
            setChats(structureRes);
        }catch(err){
            console.log(err)
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
import { NavLink } from "react-router-dom";
import { useState , Fragment } from "react";
//nav is a html tag

//of a user
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
    const click = (e)=>{
        e.preventDefault();
        setChats([...chats,newChat()])
    }
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
// Use NavLink when the thing is fundamentally a navigation link.
// Use button + navigate() when clicking the button performs an action that happens to cause navigation.
import { NavLink } from "react-router-dom";
//nav is a html tag
const chats = [{id:1,title:"meher"}]

function SidePage(){

    return(
        <>
            <button>New Chat</button>

            <nav>
                {
                    chats.map((c)=>(
                        <NavLink 
                            key={c.id}
                            to={`/chat/${c.id}`}
                        >
                            {c.title}
                        </NavLink>
                    ))
                }
            </nav>
        </>
    )
}

export default SidePage;
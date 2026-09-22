import { nav,NavLink } from "react-router-dom";

function SidePage(){

    return(
        <>
            <aside>
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
            </aside>
        </>
    )
}

export default SidePage;
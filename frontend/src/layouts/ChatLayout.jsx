//nav vs navlinks -inside l to r
//q1.sync db and history
//q2.sync store and db
import "./ChatLayout.css"
import { Outlet } from "react-router-dom";
import SidePage from "../pages/SidePage";//as default export direct import
//db gives chats = [{id,title}] = where to store?
function ChatLayout(){
//which navlink and outlet will match
    return(
        <div className="chat-layout">  
            <aside>
                <SidePage/>
            </aside>

            <main>
                {/* children of layout only 1*/}
                <Outlet/>
            </main> 
        </div>
    )
}

export default ChatLayout;
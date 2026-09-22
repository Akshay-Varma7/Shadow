//nav vs navlinks -inside l to r
//q1.sync db and history
//q2.sync store and db

import { Outlet } from "react-router-dom";
import { SidePage } from "../pages/SidePage";

chats = [{id:1,title:"meher"}]
//db gives chats = [{id,title}] = where to store?
function ChatLayout(){
//which navlink and outlet will match
    return(
        <>
            <SidePage/>

            <main>
                {/* children of layout only 1*/}
                <Outlet/>
            </main> 
        </>
    )
}

export default ChatLayout;
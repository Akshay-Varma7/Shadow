import "./ChatLayout.css"
import { Outlet } from "react-router-dom";
import SidePage from "../pages/SidePage";

function ChatLayout(){

    return(
        <div className="chat-layout">  
            {/* change this to index and css too - as page not component */}
            <aside>
                <SidePage/>
            </aside>

            <main>
                <Outlet/>
            </main> 
        </div>
    )
}

export default ChatLayout;
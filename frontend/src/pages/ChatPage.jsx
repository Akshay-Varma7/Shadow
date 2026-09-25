import Messages  from "../components/Messages";
import InputBox  from "../components/InputBox";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
//always maintain physical relation from children side not parent as deletion is easy
//layouts&routes-component/mui in layout + function-state and dup of states-link to core and be= then db and be if not-css

//not of any specific chatId
const initial = [
    {   
        messageId: 1,
        chatId: 1,
        cycleId: 1,
        isPrompt: true,
        isResponse: false,
        message: "namaste bagunava",
        gifUrl: null,
        createdAt : Date()
    },
    {
        messageId: 2,
        chatId: 1,
        cycleId: 1,
        isPrompt: false,
        isResponse: true,
        message: "haa",
        gifUrl: "https://tenor.com/erD8tXJVW6o.gif",
        createdAt : Date()
    },
    {   
        messageId: 3,
        chatId: 2,
        cycleId: 1,
        isPrompt: true,
        isResponse: false,
        message: "what is universe made of?",
        gifUrl: null,
        createdAt : Date()
    },
    {
        messageId: 4,
        chatId: 2,
        cycleId: 1,
        isPrompt: false,
        isResponse: true,
        message: "Boss atoms",
        gifUrl: "https://tenor.com/erD8tXJVW6o.gif",
        createdAt : Date()
    }
]
function call(msgs,id){//actually only id
    const result = msgs.filter((m) => m.chatId == id);//"123"==123
    return result;
}
function ChatPage(){
    const { chatId } = useParams();//string
    const [messages,setMessages] = useState([]);
    
    useEffect(()=>{
        const data = call(initial,chatId);//for now initial is like the db
        setMessages(data);//over Write
    },[chatId])

    return(
        <>
            <Messages messages={messages} setMessages={setMessages}/>
            <InputBox messages={messages} setMessages={setMessages}/>
        </>
    )
}

export default ChatPage;
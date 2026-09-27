import { useState } from "react";
function newMsg(m,chatid){
    const r = Math.floor(Math.random()*10000)+1
    return {
        messageId: r,
        chatId: chatid,
        cycleId: 1,//store in chat and update
        isPrompt: true,
        isResponse: false,
        message: m,
        gifUrl: null,
        createdAt : Date()
    }
}
function InputBox({chatId,messages,setMessages}){
    const [msg,setMsg] = useState("");
    const change = (e)=>{
        setMsg(e.target.value)
    }
    const click = (e)=>{
        e.preventDefault();
        setMessages([...messages,newMsg(msg,chatId)])
    }
     return(
        <div>
            <input name="message" type="text" value={msg} onChange={change}/>
            <button onClick={click} >send</button>
        </div>
    )
}
export default InputBox;
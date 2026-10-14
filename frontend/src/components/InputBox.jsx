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
    //local state
    const [req, setReq] = useState("");
    const change = (e)=>{
        setReq(e.target.value)
    }
    const click = (e)=>{
        e.preventDefault();
        setMessages([...messages,newMsg(req,chatId)])
    }
     return(
        <div>
            <input name="message" type="text" value={req} onChange={change}/>
            <button onClick={click} >send</button>
        </div>
    )
}
export default InputBox;
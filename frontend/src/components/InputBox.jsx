import { useState } from "react";

function InputBox({messages,setMessages}){
    const [msg,setMsg] = useState("");
    const change = (e)=>{
        setMsg(e.target.value)
    }
    const click = (e)=>{
        e.preventDefault();
        setMessages([...messages,{
            messageId: 1,
            chatId: 1,
            cycleId: 1,
            isPrompt: true,
            isResponse: false,
            message: msg,
            gifUrl: null,//try a function to mimic sending and getting struc db math.random for id
            createdAt : Date()
        }])
    }
     return(
        <div>
            <input name="message" type="text" value={msg} onChange={change}/>
            <button onClick={click} >send</button>
        </div>
    )
}
export default InputBox;
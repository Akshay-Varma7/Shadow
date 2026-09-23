import { useState } from "react";
function InputBox(){
    const [msg,setMsg] = useState("");
    const handleChange = (e)=>{
        setMsg(e.target.value)
    }
     return(
        <div>
            <input name="message" type="text" value={msg} onChange={handleChange}/>
            <button >send</button>
        </div>
    )
}
export default InputBox;
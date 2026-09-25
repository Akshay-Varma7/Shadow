import PromptMsg from "./PromptMsg";
import ResponseMsg from "./ResponseMsg";

function Messages({messages,setMessages}){
    return(
        <>
        {
            messages.map((m)=>{
                if(m.isPrompt){
                    return <PromptMsg msg={m.message} key={m.messageId}/>
                }else if(m.isResponse){
                    return <ResponseMsg msg={m.message} key={m.messageId}/>
                }
                return null;//if neither true imp
            })
        }
        </>
    )
}
//for one jsx inside it level {} for dynamic and js
//{[]} every inside []
export default Messages;
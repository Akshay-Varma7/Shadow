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
    const BE_URL = import.meta.env.VITE_BE_URL || "http://localhost:8000";
    const API_BASE = BE_URL.startsWith("http")
        ? BE_URL
        : `http://${BE_URL}`;

    const click = async (e) => {
        e.preventDefault();

        const text = req.trim();
        if (!text) return;

        try {
            const response = await fetch(
                `${API_BASE}/message/${chatId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: text }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            // Backend returns the assistant response.
            // Reload history to retrieve both persisted messages.
            const historyResponse = await fetch(
                `${API_BASE}/message/${chatId}`
            );

            if (!historyResponse.ok) {
                throw new Error(`History HTTP ${historyResponse.status}`);
            }

            const history = await historyResponse.json();

            const normalized = history.map((m) => ({
                messageId: m.message_id,
                chatId: m.chat_id,
                cycleId: m.cycle_id,
                isPrompt: m.role === "user",
                isResponse: m.role === "assistant",
                message: m.message,
                gifUrl: m.gif_url,
                createdAt: m.created_at,
            }));

            setMessages((prev) => [
                ...prev.filter(
                    (m) => String(m.chatId) !== String(chatId)
                ),
                ...normalized,
            ]);

            setReq("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    }; 
    return (
        <form className="composer-form" onSubmit={click}>
            <input
                name="message"
                type="text"
                value={req}
                onChange={change}
                placeholder="Message Shadow..."
            />
            <button type="submit">Send</button>
        </form>
    );
}
export default InputBox;
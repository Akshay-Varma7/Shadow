import "./ChatPage.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Messages from "../components/Messages";
import InputBox from "../components/InputBox";
import { useChat } from "../components/Context";

const BE_URL = import.meta.env.VITE_BE_URL;
const API_BASE = BE_URL.startsWith("http")
    ? BE_URL
    : `http://${BE_URL}`;

function ChatPage() {
    const { chatId } = useParams();
    const { messages, setMessages } = useChat();

    useEffect(() => {
        let active = true;

        async function loadMessages() {
            try {
                const response = await fetch(
                    `${API_BASE}/message/${chatId}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();

                if (!active) return;

                const normalized = data.map((m) => ({
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
            } catch (error) {
                if (active) {
                    console.error("Failed to load messages:", error);
                }
            }
        }

        loadMessages();

        return () => {
            active = false;
        };
    }, [chatId, setMessages]);

    const visibleMessages = messages.filter(
        (m) => String(m.chatId) === String(chatId)
    );

    
    return (
        <div className="chat-page">
            <div className="messages-scroll">
                <Messages messages={visibleMessages} />
            </div>

            <div className="composer">
                <InputBox
                    chatId={chatId}
                    messages={messages}
                    setMessages={setMessages}
                />
            </div>
        </div>
    );
}

export default ChatPage;
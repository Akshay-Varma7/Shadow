import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useChat } from "../components/Context";
import "./SidePage.css";

const BE_URL = import.meta.env.VITE_BE_URL || "http://localhost:8000";
const API_BASE = BE_URL.startsWith("http")
    ? BE_URL
    : `http://${BE_URL}`;

function SidePage() {
    const { chats, setChats, setCurrChatId } = useChat();
    const navigate = useNavigate();

    useEffect(() => {
        async function getChats() {
            try {
                const response = await fetch(`${API_BASE}/chat/`);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();

                setChats(
                    data.map((c) => ({
                        chatId: c.chat_id,
                        title: c.title,
                        latestCycle: c.latest_cycle,
                    }))
                );
            } catch (error) {
                console.error("Failed to load chats:", error);
            }
        }

        getChats();
    }, [setChats]);

    async function createChat() {
        try {
            const response = await fetch(`${API_BASE}/chat/`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const chat = await response.json();

            const newChat = {
                chatId: chat.chat_id,
                title: chat.title,
                latestCycle: chat.latest_cycle,
            };

            setChats((prev) => [
                ...prev.filter((c) => c.chatId !== newChat.chatId),
                newChat,
            ]);

            setCurrChatId(newChat.chatId);
            navigate(`/chat/${newChat.chatId}`);
        } catch (error) {
            console.error("Failed to create chat:", error);
        }
    }

    return (
        <div className="sidebar">
            <button
                className="new-chat-button"
                onClick={createChat}
                type="button"
            >
                + New Chat
            </button>

            <div className="chat-list-section">
                <nav className="chat-list">
                    {chats.map((chat) => (
                        <NavLink
                            key={chat.chatId}
                            to={`/chat/${chat.chatId}`}
                            className={({ isActive }) =>
                                `chat-link ${isActive ? "active" : ""}`
                            }
                            onClick={() => setCurrChatId(chat.chatId)}
                        >
                            {chat.title || `Chat ${chat.chatId}`}
                        </NavLink>
                    ))}

                    {chats.length === 0 && (
                        <p className="empty-chats">No chats yet</p>
                    )}
                </nav>
            </div>
        </div>
    );

}

export default SidePage;
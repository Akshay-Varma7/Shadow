import PromptMsg from "./PromptMsg";
import ResponseMsg from "./ResponseMsg";

function Messages({ messages }) {
    return (
        <div className="message-list">
            {messages.map((m) => (
                <div
                    key={m.messageId}
                    className={`message-row ${
                        m.isPrompt ? "user-row" : "assistant-row"
                    }`}
                >
                    {m.isPrompt ? (
                        <PromptMsg msg={m.message} />
                    ) : m.isResponse ? (
                        <ResponseMsg
                            msg={m.message}
                            gifUrl={m.gifUrl}
                        />
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default Messages;

function ResponseMsg({ msg, gifUrl }) {
    const imageUrl = gifUrl
        ? gifUrl.startsWith("http")
            ? gifUrl
            : `https://${gifUrl}`
        : null;

    return (
        <div className="response-message">
            <div>{msg}</div>

            {!imageUrl ? (
                <p className="gif-debug">
                    No GIF URL returned by backend.
                </p>
            ) : (
                <>
                    <img
                        className="response-gif"
                        src={imageUrl}
                        alt="Reaction GIF"
                        onLoad={() => console.log("GIF loaded:", imageUrl)}
                        onError={() =>
                            console.error("GIF failed to load:", imageUrl)
                        }
                    />

                    <a href={imageUrl} target="_blank" rel="noreferrer">
                        Open GIF URL
                    </a>
                </>
            )}
        </div>
    );
}

export default ResponseMsg;

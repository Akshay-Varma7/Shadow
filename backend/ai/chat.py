from langchain_core.messages import BaseMessage

from backend.ai.model import model
from backend.ai.prompt import prompt
from backend.ai.retreiver import retriever, format_docs
from backend.ai.schemas import MemeResponse

structured_model = model.with_structured_output(MemeResponse)

rag_chain = (
    {
        # "context": retriever | format_docs
        "context": (
            (lambda x: x["question"])
            | retriever
            | format_docs
        ),
        "question": lambda x: x["question"],
        "history": lambda x: x["history"],
    }
    | prompt
    | structured_model
)

def generate_reply(
    question: str,
    history: list[BaseMessage] | None = None,
) -> MemeResponse:
    return rag_chain.invoke({
        "question": question,
        "history": history or [],
    })
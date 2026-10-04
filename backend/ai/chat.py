from langchain_core.messages import HumanMessage, AIMessage

from model import model
from prompt import prompt
from retriever import retriever, format_docs
from schemas import MemeResponse


structured_model = model.with_structured_output(MemeResponse)

rag_chain = (
    {
        "context": retriever | format_docs,
        "question": lambda x: x["question"],
        "history": lambda x: x["history"]
    }
    | prompt
    | structured_model
)


history = []

while True:

    question = input("You: ")

    result = rag_chain.invoke({
        "question": question,
        "history": history
    })

    history.append(
        HumanMessage(content=question)
    )

    history.append(
        AIMessage(content=result.funny_response)
    )

    print("AI:", result.funny_response)
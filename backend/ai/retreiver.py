from ingest import vectorstore

retriever = vectorstore.as_retriever(
    search_kwargs={"k": 5}
)

def format_docs(docs):
    return "\n\n".join(
        doc.page_content
        for doc in docs
    )
from langchain_chroma import Chroma
from chunking import chunks
from embeddings import embeddings

vectorstore = Chroma.from_documents(#or from_texts there text and meta_data instead of documents
    #for a collection stores 3 col for each chunk vector(from embeddings),text(from chunk.pagecontent),metadata(from chunk.metadata)
    documents=chunks,
    embedding=embeddings,
    collection_name="memes"
)#has semantic search
#each chunk in chroma = vector ↔ original chunk ↔ metadata
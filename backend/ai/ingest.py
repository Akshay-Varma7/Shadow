from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma

AI_DIR = Path(__file__).resolve().parent
PDF_PATH = AI_DIR / "data" / "meme.pdf"
CHROMA_PATH = AI_DIR / "chroma_db"

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001"
)

vectorstore = Chroma(
    collection_name="telugu_memes",
    embedding_function=embeddings,
    persist_directory=str(CHROMA_PATH),
)

# Ingest only when the persistent collection is empty.
if not vectorstore.get()["ids"]:
    loader = PyPDFLoader(str(PDF_PATH))
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )

    chunks = splitter.split_documents(documents)
    vectorstore.add_documents(chunks)
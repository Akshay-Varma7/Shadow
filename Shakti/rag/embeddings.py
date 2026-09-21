from langchain_google_genai import GoogleGenerativeAIEmbeddings
from chunking import chunks
#GoogleGenerativeAI-?
embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001"
)

# Extract text from each Document object in the chunks list
context_array = [chunk.page_content for chunk in chunks]# imp-list comprehension using generator

# Generate embeddings for the extracted text
vector = embeddings.embed_documents(context_array)#[[0.12,...],[],...for each chunk] 
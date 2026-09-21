from vectorDB import vectorstore#has 
retriever = vectorstore.as_retriever()

def format_docs(docs):
    return "\n\n".join(
        doc.page_content for doc in docs
    )
#result:makes a doc for a chunk = arr of doc(page_content,metadata)

# Stored                         in Chroma	        Returned to you                             
# similarity_search()	             —	           text + metadata only
# similarity_search_with_score()	 —	           text + metadata + distance score
# similarity_search_with_vectors() —	          (doc(2),vector) text + metadata + the actual embedding vector
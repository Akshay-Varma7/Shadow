from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("meme.pdf")#instance with a document to use its method

documents = loader.load()#list of langchain document object(a page)


# print(len(documents))#no of pages
# print(documents[0].page_content[:500])#content in page1's 500 chars**

# one such:
# Document(
#     page_content="Employees receive 18 days...",
#     metadata={
#         "page": 0,
#         "source": "document.pdf"
#     }
# )
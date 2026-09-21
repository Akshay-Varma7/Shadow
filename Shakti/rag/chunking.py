from langchain_text_splitters import RecursiveCharacterTextSplitter
from document import documents
#by RecursiveCharacter
text_splitter = RecursiveCharacterTextSplitter(#instance to use its methods
    chunk_size=1000,#characters
    chunk_overlap=200#for not loosing context btw chunks(also helps abrupt cuts)
)
#It tries separators in a hierarchy, from most to least semantic: to stop chunks
# It starts at \n\n.-can stop without 1000 chars.1
# If a paragraph is still too big to fit in 1000 chars, 
# it recursively drills down to \n, then , then character-by-character. 
# This keeps sentences/paragraphs intact as long as possible.
# " "   (word)
# ""   (single character — last resort)
#less if 2.doc is small or 3.last chunk

chunks = text_splitter.split_documents(documents)#same list of smaller document obj preserving pagr document metadata

# print("Number of chunks:", len(chunks))
# print(chunks[0].page_content)
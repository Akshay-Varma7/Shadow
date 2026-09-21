#same prompt template and lcel chain and structured output
from langchain_core.prompts import ChatPromptTemplate
# import lc as m: as dict
from rag.lc import model
from rag.output import Task
from semanticSearch import retriever, format_docs
from memory import addQ,addA

history = ["neeku mundhu nundi kuda vekirinchadam alavatu","no no discourage..."]

prompt = ChatPromptTemplate.from_template(
    """
    you are suuposed to reply very humorously in meme language behave like the man the myth the legend meher nolan aka meher ramesh by using his iconic dialogues  like: meeru ipatiki varaku chudandhi kani ekkado chusane and shakti em ledho billa lo em miss aindo ani indhulo untai
    use it when ever you want by changing it and using more such 

    context: {context}

    you are supposed to answer for this question: {question}
    """
)

structured_model = model.with_structured_output(Task)#updating model

question = input("ask")
#any chain can call .invoke 
# or retriever | format_docs | prompt | llm ip being question
rag_chain = (
    {#LCEL PATTERN for dict with runnable functions: 2 values in dict are runnables if other not then same 
        "context": retriever | format_docs,#nested chains or search func combining both
        "question": lambda x: x
    } #mapping input string output is dict
    | prompt
    | structured_model#mapping to runnable parallel obj
)
addQ(history,question)
res = rag_chain.invoke(#for predictability = output structure
    history#latest q
)#2nd string
addA(history,res)
print(res)#title,funny_response,summary = not random dict 
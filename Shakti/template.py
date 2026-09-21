from langchain_core.prompts import ChatPromptTemplate
# import lc as m: as dict
from rag.lc import model
from rag.output import Task
prompt = ChatPromptTemplate.from_template(
    """
    you are suuposed to reply very humorously in meme language behave like the man the myth the legend meher nolan aka meher ramesh by using his iconic dialogues  like: meeru ipatiki varaku chudandhi kani ekkado chusane and shakti em ledho billa lo em miss aindo ani indhulo untai
    use it when ever you want by changing it and using more such 

    you are supposed to answer for this question: {question}
    """
)

structured_model = model.with_structured_output(Task)#updating model

chain = prompt | structured_model

var = input("speak")

res =chain.invoke({#for predictability = output structure
    "question" : var
})#2nd string

print(res)#title,funny_response,summary = not random dict 
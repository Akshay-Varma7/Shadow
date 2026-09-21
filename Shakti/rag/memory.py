#add to db or sort 
from langchain_core.messages import HumanMessage, AIMessage

def addQ(history,q):
    history.append(HumanMessage(q))

def addA(history,ans):
    history.append(AIMessage(ans))
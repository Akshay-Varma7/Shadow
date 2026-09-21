from langchain_google_genai import ChatGoogleGenerativeAI
from tool/relavancy import relavancy
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0
)
llm_w_tools = llm.bind_tools([relavancy])
#response.tool_calls [dict: name,args] then program executes the tool

response = llm.invoke(#or chatmodel or agent?
    #same syntax for chatmodel or prompt template
   question
)

print(response.content)
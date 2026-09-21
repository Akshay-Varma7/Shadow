from langchain_google_genai import ChatGoogleGenerativeAI#chat model vs llm
model = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash"
)


# response = model.invoke("is meher nolan vs maruthi of rajsaab who is the goat")
# print(response.content[0]["text"])
#would run if imported hence only func
from langchain.agents import create_agent
from langchain_core.tools import tool

# -------------------------
# 1. TOOL need type ip and op
# -------------------------

@tool
def get_exam_date(course: str) -> str:
    """Get the exam date for a college course."""
    data = {
        "CSE": "June 10",
        "ECE": "June 12"
    }
    return data.get(course, "Exam date not found")


@tool
def get_hostel_fee() -> str:
    """Get the annual hostel fee."""
    return "Hostel fee is ₹80,000 per year."


# -------------------------
# 2. KNOWLEDGE BASE
# -------------------------

college_knowledge = """
College hostel eligibility: students must maintain at least 75% attendance.
The library is open from 8 AM to 10 PM.
The CSE department has 120 seats.
"""


@tool
def search_college_knowledge(question: str) -> str:
    """Search college information."""
    
    # Simplified RAG retrieval
    if "hostel" in question.lower():
        return "Students need at least 75% attendance for hostel eligibility."
    
    if "library" in question.lower():
        return "The library is open from 8 AM to 10 PM."
    
    return "No relevant information found."


# -------------------------
# 3. AGENT
# -------------------------

agent = create_agent(
    model=llm,
    tools=[
        get_exam_date,
        get_hostel_fee,
        search_college_knowledge
    ]
)


# -------------------------
# 4. MEMORY
# -------------------------

history = []


while True:

    question = input("You: ")

    history.append({
        "role": "user",
        "content": question
    })

    result = agent.invoke({
        "messages": history
    })

    history = result["messages"]

    print("AI:", history[-1].content)
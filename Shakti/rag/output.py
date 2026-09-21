from pydantic import BaseModel
# from typing import List

class Task(BaseModel):
    title: str
    funny_response: str
    summary: str
    # steps: List[str]
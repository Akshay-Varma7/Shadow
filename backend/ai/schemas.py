from pydantic import BaseModel

class MemeResponse(BaseModel):
    funny_response: str
    gif_url: str
    summary: str
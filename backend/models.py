from pydantic import BaseModel
from typing import Optional
from datetime import date


class NoteCreate(BaseModel):
    title: str
    description: str
    date: date


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[date] = None


class NoteResponse(BaseModel):
    id: str
    title: str
    description: str
    date: date

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from database import notes_collection
from models import NoteCreate, NoteUpdate, NoteResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def serialize(note) -> dict:
    return {
        "id": str(note["_id"]),
        "title": note["title"],
        "description": note["description"],
        "date": note["date"],
    }


@app.get("/notes", response_model=list[NoteResponse])
async def get_notes():
    notes = await notes_collection.find().to_list(100)
    return [serialize(n) for n in notes]


@app.post("/notes", response_model=NoteResponse, status_code=201)
async def create_note(note: NoteCreate):
    data = note.model_dump()
    data["date"] = str(data["date"])
    result = await notes_collection.insert_one(data)
    created = await notes_collection.find_one({"_id": result.inserted_id})
    return serialize(created)


@app.put("/notes/{note_id}", response_model=NoteResponse)
async def update_note(note_id: str, note: NoteUpdate):
    updates = {k: str(v) if k == "date" else v for k, v in note.model_dump(exclude_none=True).items()}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await notes_collection.find_one_and_update(
        {"_id": ObjectId(note_id)},
        {"$set": updates},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Note not found")
    return serialize(result)


@app.delete("/notes/{note_id}", status_code=204)
async def delete_note(note_id: str):
    result = await notes_collection.delete_one({"_id": ObjectId(note_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")

import { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  const handleCreate = async (form) => {
    const note = await createNote(form);
    setNotes([...notes, note]);
  };

  const handleUpdate = async (form) => {
    const updated = await updateNote(editNote.id, form);
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
    setEditNote(null);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>📝 Note Maker</h1>
      </header>
      <main>
        <NoteForm
          onSubmit={editNote ? handleUpdate : handleCreate}
          editNote={editNote}
          onCancel={() => setEditNote(null)}
        />
        <div className="notes-grid">
          {notes.length === 0 && <p className="empty">No notes yet. Create one!</p>}
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={setEditNote} onDelete={handleDelete} />
          ))}
        </div>
      </main>
    </div>
  );
}

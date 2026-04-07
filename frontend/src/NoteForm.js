import { useState, useEffect } from "react";

const empty = { title: "", description: "", date: "" };

export default function NoteForm({ onSubmit, editNote, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editNote ? { title: editNote.title, description: editNote.description, date: editNote.date } : empty);
  }, [editNote]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>{editNote ? "Edit Note" : "New Note"}</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <div className="form-actions">
        <button type="submit">{editNote ? "Update" : "Add Note"}</button>
        {editNote && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

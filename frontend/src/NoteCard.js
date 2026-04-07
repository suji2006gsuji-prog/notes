export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>
        <span className="note-date">{note.date}</span>
      </div>
      <p>{note.description}</p>
      <div className="note-actions">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

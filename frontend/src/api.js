const BASE_URL = "http://localhost:8000";

export const getNotes = () => fetch(`${BASE_URL}/notes`).then((r) => r.json());

export const createNote = (note) =>
  fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  }).then((r) => r.json());

export const updateNote = (id, note) =>
  fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  }).then((r) => r.json());

export const deleteNote = (id) =>
  fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });

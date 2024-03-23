import { httpClient } from "../../util";
import { ApiNote } from "./api.types";

export function fetchSessionUserNotes() {
  return httpClient.get<ApiNote[]>("/notes");
}

export function updateNote(note: ApiNote) {
  return httpClient.put<ApiNote>(`/notes/${note.id}`, note);
}

export function createNote(contents: string) {
  return httpClient.post<ApiNote>("/notes", { contents });
}

export function deleteNote(noteId: string) {
  return httpClient.del(`/notes/${noteId}`);
}

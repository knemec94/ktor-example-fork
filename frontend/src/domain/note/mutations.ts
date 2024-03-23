import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { paths } from "../../util";
import { createNote, updateNote, deleteNote } from "./api";
import { ApiNote } from "./api.types";
import { notesQueryKey } from "./query-keys";

export function useUpdateNoteMutation(contents: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    mutationKey: [contents],
    onSuccess: (data) => {
      queryClient.setQueryData([notesQueryKey], (currentNotes: ApiNote[]) =>
        currentNotes.map((note) =>
          data.id === note.id ? { ...note, ...data } : note
        )
      );
    },
  });
}

export function useCreateNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      queryClient.setQueryData([notesQueryKey], (currentNotes: ApiNote[]) => [
        ...currentNotes,
        data,
      ]);
    },
  });
}

export function useDeleteNoteMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: (_, noteId) => {
      const currentNotes = queryClient.getQueryData<ApiNote[]>([notesQueryKey]);
      const noteIndex =
        currentNotes?.findIndex((note) => note.id === noteId) ?? -1;
      const nextNote = currentNotes?.[noteIndex + 1];

      queryClient.setQueryData([notesQueryKey], (currentNotes: ApiNote[]) =>
        currentNotes.filter((note) => note.id !== noteId)
      );

      navigate(nextNote ? paths.note(nextNote.id) : paths.index);
    },
  });
}

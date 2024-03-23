import { useParams } from "react-router-dom";
import { useDeleteNoteMutation, useNotesQuery } from "../../../domain/note";
import { Button } from "../../../components";
import { NoteEditor } from "./NoteEditor";
import styles from "./note-page.module.scss";

export const NotePage = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { data, isFetching } = useNotesQuery();
  const { mutate, isPending } = useDeleteNoteMutation();

  const note = data?.map.get(noteId!);

  if (isFetching) {
    return <h1>Loading....</h1>;
  }

  if (!note) {
    return <h1>Note not found</h1>;
  }

  const handleDeleteNote = () => {
    mutate(noteId!);
  };

  return (
    <div className={styles.root}>
      <Button
        onClick={handleDeleteNote}
        className={styles.delete}
        disabled={isPending}
      >
        Delete note
      </Button>
      <NoteEditor key={noteId} note={note} />
    </div>
  );
};

import { FocusEvent, useEffect, useState } from "react";
import { ApiNote, useUpdateNoteMutation } from "../../../domain/note";
import { useDebouncedValue } from "../../../util";

interface Props {
  note: ApiNote;
}

export const NoteEditor = ({ note }: Props) => {
  const [contents, setContents] = useState(note.contents);
  const { mutate } = useUpdateNoteMutation(contents);
  const debouncedValue = useDebouncedValue(contents, 300);

  useEffect(() => {
    mutate({ ...note, contents: debouncedValue });
  }, [debouncedValue]);

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    const lengthOfInput = e.target.value.length;
    return e.target.setSelectionRange(lengthOfInput, lengthOfInput);
  };

  return (
    <textarea
      autoFocus
      value={contents}
      onFocus={handleFocus}
      onChange={(e) => setContents(e.target.value)}
      suppressContentEditableWarning
    />
  );
};

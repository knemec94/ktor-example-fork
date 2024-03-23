import { useQuery } from "@tanstack/react-query";
import { fetchSessionUserNotes } from "./api";
import { notesQueryKey } from "./query-keys";

export function useNotesQuery() {
  const query = useQuery({
    queryKey: [notesQueryKey],
    queryFn: fetchSessionUserNotes,
    select: (data) => ({
      array: data,
      map: new Map(data.map((item) => [item.id, item])),
    }),
  });

  return query;
}

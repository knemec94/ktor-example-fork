import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "./api";
import { currentUserQueryKey } from "./query-keys";

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: [currentUserQueryKey],
    queryFn: fetchCurrentUser,
  });
}

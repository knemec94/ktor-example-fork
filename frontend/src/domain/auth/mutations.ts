import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "./api";
import { currentUserQueryKey } from "./query-keys";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => queryClient.setQueryData([currentUserQueryKey], data),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: register,
  });
}

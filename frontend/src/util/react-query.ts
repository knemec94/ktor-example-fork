import { QueryClient } from "@tanstack/react-query";
import { isAuthenticationError, isHttpError } from "./error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 60 * 60,
      retry: (count, error) => {
        if (isHttpError(error)) {
          return error.response.status !== 500;
        }
        if (isAuthenticationError(error)) {
          return false;
        }
        return count < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});

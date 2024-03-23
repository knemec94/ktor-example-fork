import { httpClient } from "../../util";
import { ApiUser, CreateUserPayload, Credentials } from "./api.types";

export function login(payload: Credentials) {
  return httpClient.post<ApiUser>("/login", payload);
}

export function fetchCurrentUser() {
  return httpClient.get<ApiUser>("/me");
}

export function register(payload: CreateUserPayload) {
  return httpClient.post<ApiUser>("/user", payload);
}

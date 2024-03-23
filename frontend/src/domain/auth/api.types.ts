import { BaseEntity } from "../base-types";

export interface Credentials {
  email: string;
  password: string;
}

export interface ApiUser extends BaseEntity {
  email: string;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
}

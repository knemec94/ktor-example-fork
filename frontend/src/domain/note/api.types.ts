import { BaseEntity } from "../base-types";

export interface ApiNote extends BaseEntity {
  contents: string;
}

import { User } from "better-auth";

export interface Lobby {
  id: string;
  createdAt: Date;
  code: string;
  creatorId: string;
  settings: string;
  users: User[];
}

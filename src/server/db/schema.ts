import {
  pgTableCreator,
  text,
  timestamp,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `wolfwer_${name}`);

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").unique().notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  lobbyHost: boolean("lobby_host").notNull().default(false),
  lobbyId: uuid("lobby_id").references(() => lobby.id, { onDelete: "cascade" }),
});

export const lobby = createTable("lobby", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull(),
  code: text("code")
    .notNull()
    .unique()
    .default(sql`upper(substring(md5(gen_random_uuid()::text) from 1 for 5))`),
  settings: text("settings").notNull(),
});

export const gameResult = createTable("game_result", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  isWinner: boolean("is_winner").notNull().default(false),
  isAlive: boolean("is_alive").notNull().default(true),
  createdAt: timestamp("created_at").notNull(),
});

export type SelectUser = typeof user.$inferSelect;
type InsertUser = typeof user.$inferInsert;

export type SelectLobby = typeof lobby.$inferSelect;
type InsertLobby = typeof lobby.$inferInsert;

export type SelectGameResult = typeof gameResult.$inferSelect;
type InsertGameResult = typeof gameResult.$inferInsert;

export type Lobby = Pick<SelectUser, "id" | "username" | "lobbyHost"> & {
  users: SelectUser[];
};

/* auth schema */

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

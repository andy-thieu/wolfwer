// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
    integer,
    pgTableCreator, serial, text,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `wolfwer_${name}`);

export const users = createTable(
  "users",
    {
        id: serial('id').primaryKey(),
        username: text('username').notNull(),
        wins: integer('wins').notNull().default(0),
        losses: integer('losses').notNull().default(0),
    }
);

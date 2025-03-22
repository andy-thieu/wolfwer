"use server";

import { db } from "~/server/db";
import { lobby, user } from "~/server/db/schema";

import { eq } from "drizzle-orm";
import { mockSettings } from "~/lib/mock-data";
const generateGameCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let gameCode = "";
  for (let i = 0; i < 5; i++) {
    gameCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return gameCode;
};

const createDefaultLobbyData = {
  code: generateGameCode(),
  settings: JSON.stringify(mockSettings),
  createdAt: new Date(),
};

export const createLobby = async ({ creatorId }: { creatorId: string }) => {
  const defaultLobbyData = createDefaultLobbyData;
  const lobbyData = await db.insert(lobby).values(defaultLobbyData).returning();
  if (!lobbyData[0]) {
    throw new Error("Failed to create lobby");
  }

  await db
    .update(user)
    .set({ lobbyId: lobbyData[0].id, lobbyHost: true })
    .where(eq(user.id, creatorId));

  return lobbyData[0].code;
};

export const getLobby = async (code: string) => {
  const lobbyData = await db
    .select({
      code: lobby.code,
      settings: lobby.settings,
      user: { username: user.username, lobbyHost: user.lobbyHost },
    })
    .from(lobby)
    .innerJoin(user, eq(lobby.id, user.lobbyId))
    .where(eq(lobby.code, code));
  return lobbyData;
};

export const joinLobby = async (code: string, userId: string) => {

  const lobbyData = await db
    .select()
    .from(lobby)
    .innerJoin(user, eq(lobby.id, user.lobbyId))
    .where(eq(lobby.code, code));

  if (!lobbyData[0]) {
    throw new Error("Lobby not found");
  }

  await db
    .update(user)
    .set({ lobbyId: lobbyData[0].lobby.id, lobbyHost: false })
    .where(eq(user.id, userId));
};

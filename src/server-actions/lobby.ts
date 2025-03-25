"use server";

import { db } from "~/server/db";
import { lobby, user } from "~/server/db/schema";

import { eq } from "drizzle-orm";
import { mockSettings } from "~/lib/mock-data";

const createDefaultLobbyData = {
  settings: JSON.stringify(mockSettings),
  createdAt: new Date(),
};

export const createLobby = async ({ creatorId }: { creatorId: string }) => {
  const defaultLobbyData = createDefaultLobbyData;
  const [lobbyData] = await db
    .insert(lobby)
    .values(defaultLobbyData)
    .returning();

  if (!lobbyData) {
    throw new Error("Failed to create lobby");
  }

  await db
    .update(user)
    .set({ lobbyId: lobbyData.id, lobbyHost: true })
    .where(eq(user.id, creatorId));

  return lobbyData.code;
};

export const getLobby = async (code: string) => {
  const lobbyData = await db
    .select({
      id: lobby.id,
      code: lobby.code,
      settings: lobby.settings,
      users: {
        id: user.id,
        username: user.username,
        lobbyHost: user.lobbyHost,
      },
    })
    .from(lobby)
    .innerJoin(user, eq(lobby.id, user.lobbyId))
    .where(eq(lobby.code, code));

  if (!lobbyData[0]) {
    throw new Error("Lobby not found");
  }

  // Group users into an array
  const result = {
    id: lobbyData[0].id,
    code: lobbyData[0].code,
    settings: lobbyData[0].settings,
    users: lobbyData.map((row) => row.users),
  };

  return result;
};

export const joinLobby = async (code: string, userId: string) => {
  const lobbyData = await getLobby(code);

  if (!lobbyData) {
    throw new Error("Lobby not found");
  }

  await db
    .update(user)
    .set({ lobbyId: lobbyData.id, lobbyHost: false })
    .where(eq(user.id, userId));
};

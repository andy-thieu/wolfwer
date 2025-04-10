"use server";

import { db } from "~/server/db";
import { lobby, user } from "~/server/db/schema";

import { eq } from "drizzle-orm";
import { mockSettings } from "~/lib/mock-data";
import { env } from "~/env";

import Pusher from "pusher";

const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: env.PUSHER_APP_SECRET,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

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

  const userData = await db
    .update(user)
    .set({ lobbyId: lobbyData.id, lobbyHost: false })
    .where(eq(user.id, userId))
    .returning({
      id: user.id,
      username: user.username,
      lobbyHost: user.lobbyHost,
    });

  try {
    await pusher.trigger(`lobby-${lobbyData.id}`, "new-user", {
      userData: userData[0],
    });
  } catch (error) {
    console.error("Failed to trigger Pusher event:", error);
  }

  return userData[0];
};

export const leaveLobby = async (userId: string, lobbyId: string) => {
  const userData = await db
    .update(user)
    .set({ lobbyId: null, lobbyHost: false })
    .where(eq(user.id, userId))
    .returning({
      id: user.id,
      username: user.username,
      lobbyHost: user.lobbyHost,
    });

  try {
    await pusher.trigger(`lobby-${lobbyId}`, "remove-user", {
      userId: userId,
    });
  } catch (error) {
    console.error("Failed to trigger Pusher event:", error);
  }
  console.log("userData", userData);
  return userData[0];
};

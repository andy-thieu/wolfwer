import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://wolfwer.net");

export const authClient = createAuthClient({
  baseURL: appUrl,
  plugins: [usernameClient()],
});

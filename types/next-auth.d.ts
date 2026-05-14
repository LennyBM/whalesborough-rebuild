import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /** Augment the Session.user shape with our app's id (and Wave 2: role). */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

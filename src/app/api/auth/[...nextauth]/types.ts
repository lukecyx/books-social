import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export type JWTToken = {
  token: JWT;
  user: User;
};

export type SessionToken = {
  session: Session;
  token: JWT;
};

export type AuthRequest = {
  body?: {
    email?: string;
    password?: string;
  };
  query?: Record<string, string | string[]>;
  headers: Record<string, string>;
  method?: string;
};

export type Credentials = Record<"email" | "password", string> | undefined;

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    user: {
      id: string;
      email: string;
      name?: string | null;
      accessToken?: string;
      idToken?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    accessToken?: string;
    idToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    sub?: string;
    email?: string;
    name?: string;
  }
}

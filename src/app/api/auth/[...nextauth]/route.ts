import {
  AdminInitiateAuthCommand,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authClient } from "@/lib/providers";

import { AuthRequest, Credentials, JWTToken, SessionToken } from "./types";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "cognito-provider",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // eslint-disable-next-line
      // @ts-ignore
      async authorize(credentials: Credentials, req: AuthRequest) {
        console.log({ credentials });
        if (!credentials?.email) {
          return null;
        }

        const command = new AdminInitiateAuthCommand({
          ClientId: process.env.COGNITO_CLIENT_ID,
          UserPoolId: process.env.COGNITO_USER_POOL_ID,
          AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
          AuthParameters: {
            USERNAME: credentials?.email ?? "",
            PASSWORD: credentials?.password ?? "",
          },
        });

        try {
          const response = await authClient.send(command);
          const result = response.AuthenticationResult;

          return {
            id: credentials.email,
            email: credentials.email,
            accessToken: result?.AccessToken,
            refreshToken: result?.RefreshToken,
            idToken: result?.IdToken,
            expiresIn: result?.ExpiresIn,
          };
        } catch (error) {
          console.error(error);

          return null;
        }
      },
      callbacks: {
        // Attach tokens to NextAuth JWT.
        async jwt({ token, user }: JWTToken) {
          if (user) {
            token.accessToken = user.accessToken;
            token.idToken = user.idToken;
          }
          return token;
        },

        // Expose attributes on user. User is only serialised by default.
        async session({ session, token }: SessionToken) {
          session.user.accessToken = token.accessToken;
          session.user.idToken = token.idToken;
          return session;
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };

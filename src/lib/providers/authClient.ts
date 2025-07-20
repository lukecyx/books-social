import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const authClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

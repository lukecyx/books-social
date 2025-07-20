import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createYoga } from "graphql-yoga";

import { resolvers } from "@/app/api/graphql/resolvers";

const typesArray = loadFilesSync("src/app/api/graphql/schema/**/*.graphql", {
  extensions: ["graphql"],
});

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers,
});
export const yoga = createYoga({
  schema: schema,
  graphqlEndpoint: "/api/graphql",
});

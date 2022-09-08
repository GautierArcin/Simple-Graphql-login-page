import { ApolloServer } from "apollo-server";
import { context } from "./src/context";

import typeDefs from "./src/graphql/schema/type-defs";
import resolvers from "./src/graphql/resolvers";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  const { url } = await server.listen();

  // On désactive l'erreur d'ES-lint sur la prochaine ligne c:
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
})();

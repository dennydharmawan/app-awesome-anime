import { GraphQLClient } from "graphql-request";
import { useMemo } from "react";

let client: GraphQLClient;

// https://github.com/prisma-labs/graphql-request
function createGraphqlClient() {
  return new GraphQLClient(
    process.env.NEXT_PUBLIC_ANALYTICS_ID ||
      'https://mazipan-gql-pokeapi.herokuapp.com/graphql',
    {
      headers: {},
    }
  );
}
export function initializeClient() {
  const _client = client ?? createGraphqlClient();

  return _client;
}

export default initializeClient();

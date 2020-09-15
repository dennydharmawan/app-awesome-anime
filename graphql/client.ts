import { GraphQLClient } from "graphql-request";
import { useMemo } from "react";

let client: GraphQLClient;

// https://github.com/prisma-labs/graphql-request
function createGraphqlClient(url: string) {
  return new GraphQLClient(url, {
    headers: {},
  });
}
export function initializeClient(url: string) {
  const _client = client ?? createGraphqlClient(url);

  return _client;
}

const useGqlClient = (url: string = process.env.NEXT_PUBLIC_GRAPHQL_URL!) => {
  const client = useMemo(() => initializeClient(url), [url]);

  return client;
};

export default useGqlClient;

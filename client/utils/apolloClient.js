import { ApolloClient, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  return new ApolloClient({
    uri: `${process.env.API_BASE_URL}/graphql`,
    cache,
  });
}

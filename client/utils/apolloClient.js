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
    uri: "http://localhost:5000/graphql",
    cache,
  });
}

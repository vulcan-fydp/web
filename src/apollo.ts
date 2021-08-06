import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: (operation) => `/${operation.getContext().target}/graphql`,
});

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

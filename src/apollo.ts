import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";

const link = split(
  (operation) => operation.getContext().target === "backend",
  createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  }),
  createHttpLink({
    uri: "http://localhost:9443",
    credentials: "include",
  })
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

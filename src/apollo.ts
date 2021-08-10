import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: "https://vulcangames.fun/graphql",
});

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

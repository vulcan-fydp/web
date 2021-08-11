import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from "@apollo/client";

const link = createHttpLink({
  uri: (operation) => `/${operation.getContext().target}/graphql`,
});

// TODO: We'll need to disable apollo client caching for cases like
// logging in (or maybe seeing player updates from the player tab).
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions,
});

import { ApolloProvider } from "@apollo/client";

import "@fontsource/montserrat";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apollo";
import { Pages } from "./pages";
import { theme } from "./theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ApolloProvider>
  </ChakraProvider>
);

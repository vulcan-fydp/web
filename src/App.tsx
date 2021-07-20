import { ApolloProvider } from "@apollo/client";

import "@fontsource/montserrat";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apollo";
import { Pages } from "./pages";
import { theme } from "./theme";
import { SessionContext } from "contexts/session";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={apolloClient}>
      <SessionContext>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </SessionContext>
    </ApolloProvider>
  </ChakraProvider>
);

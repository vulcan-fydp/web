import { ApolloProvider } from "@apollo/client";

import "@fontsource/montserrat";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apollo";
import { Pages } from "./pages";
import { vulcanTheme } from "./theme";
import { SessionContext } from "contexts/session";

export const App = () => (
  <ChakraProvider theme={vulcanTheme}>
    <ApolloProvider client={apolloClient}>
      <SessionContext>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </SessionContext>
    </ApolloProvider>
  </ChakraProvider>
);

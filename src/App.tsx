import { ApolloProvider } from "@apollo/client";

import "@fontsource/montserrat";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apollo";
import { Pages } from "./pages";
import { vulcanTheme } from "./theme";

export const App = () => (
  <ChakraProvider theme={vulcanTheme}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ApolloProvider>
  </ChakraProvider>
);

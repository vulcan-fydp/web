import { ApolloProvider } from "@apollo/client";

// Specify the specific font weights we're using
import "@fontsource/montserrat";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apollo";
import { Pages } from "./pages";

const theme = extendTheme({
  fonts: {
    heading: "montserrat",
    body: "montserrat",
  },
  textStyles: {
    h1: {
      fontWeight: "semibold",
    },
    h3: {
      fontWeight: "regular",
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "white",
      },
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ApolloProvider>
  </ChakraProvider>
);

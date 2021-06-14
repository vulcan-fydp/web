import { ApolloProvider } from "@apollo/client";

import "@fontsource/montserrat";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apollo";
import { Pages } from "./pages";

const theme = extendTheme({
  fonts: {
    heading: "montserrat",
    body: "montserrat",
  },
  components: {
    Heading: {
      baseStyle: {
        color: "white",
        fontWeight: "regular",
      },
      sizes: {
        "4xl": {
          fontWeight: "black",
        },
      },
    },
    Button: {
      baseStyle: {
        boxShadow: "md",
      },
    },
    Input: {
      baseStyle: {
        boxShadow: "md",
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

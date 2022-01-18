import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/montserrat";
import { apolloClient } from "app/apollo";
import { Pages } from "app/pages";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { vulcanTheme } from "theme";

const VulcanGamingPlatformApp = () => (
  <ChakraProvider theme={vulcanTheme}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ApolloProvider>
  </ChakraProvider>
);

export default VulcanGamingPlatformApp;

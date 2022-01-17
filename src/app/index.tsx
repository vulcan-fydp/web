import { ApolloProvider } from "@apollo/client";

import "@fontsource/montserrat";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route } from "react-router-dom";
import { apolloClient } from "app/apollo";
import { Pages } from "app/pages";
import { vulcanTheme } from "theme";
import { QueryParamProvider } from "use-query-params";

const VulcanGamingPlatformApp = () => (
  <ChakraProvider theme={vulcanTheme}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Pages />
        </QueryParamProvider>
      </BrowserRouter>
    </ApolloProvider>
  </ChakraProvider>
);

export default VulcanGamingPlatformApp;

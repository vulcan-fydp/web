import { ChakraProvider } from "@chakra-ui/react";
import { vulcanTheme } from "theme";
import { Router } from "./pages";

const VulcanGamingPlatformStaticSite = () => {
  return (
    <ChakraProvider theme={vulcanTheme}>
      <Router />
    </ChakraProvider>
  );
};

export default VulcanGamingPlatformStaticSite;

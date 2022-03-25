import { ChakraProvider } from "@chakra-ui/react";
import { vulcanTheme } from "theme";
import { Router } from "./pages";
import "@fontsource/montserrat/800.css";

const VulcanGamingPlatformStaticSite = () => {
  return (
    <ChakraProvider theme={vulcanTheme}>
      <Router />
    </ChakraProvider>
  );
};

export default VulcanGamingPlatformStaticSite;

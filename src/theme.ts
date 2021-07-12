import "@fontsource/montserrat";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "montserrat",
    body: "montserrat",
  },
  fontSizes: {
    sm: "18px",
    md: "22px",
    lg: "42px",
    xl: "64px",
  },
  colors: {
    black: "#282828",
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

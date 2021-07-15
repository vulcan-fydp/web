import "@fontsource/montserrat";

import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "montserrat",
    body: "montserrat",
  },
  colors: {
    black: "#282828",
    grey: "#434343",
    purple: "#9F7AEA",
    darkPurple: "#733BE7",
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
      variants: {
        solid: {
          sz: "lg",
          bg: "purple",
          color: "white",
          _hover: {
            bg: "darkPurple",
          },
        },
        link: {
          _hover: {
            color: "purple",
            textDecoration: "none",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        boxShadow: "md",
      },
    },
  },
});
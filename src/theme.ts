import "@fontsource/montserrat";

import { extendTheme, theme } from "@chakra-ui/react";

export const vulcanTheme = extendTheme({
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
        color: "white",
        boxShadow: "md",
      },
      variants: {
        solid: {
          sz: "lg",
          bg: "purple",
          _hover: {
            bg: "darkPurple",
          },
        },
        solidSmall: {
          height: "28px",
          padding: "0 12px",
          bg: "purple",
          color: "white",
          _hover: {
            bg: "darkPurple",
          },
        },
        link: {
          color: "white",
          _hover: {
            color: "purple",
            textDecoration: "none",
          },
        },
        kickLink: {
          ...theme.components.Button.variants.link,
          height: "28px",
          padding: "0 12px",
          color: "purple",
          _hover: {
            color: "darkPurple",
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

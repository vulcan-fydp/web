import "@fontsource/montserrat";

import { extendTheme, withDefaultColorScheme, theme } from "@chakra-ui/react";

export const vulcanTheme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
    },
    fonts: {
      heading: "montserrat",
      body: "montserrat",
    },
    colors: {
      black: "#282828",
      grey: "#434343",
    },
    components: {
      Tabs: {
        variants: {
          line: {
            tab: {
              color: "white",
              fontWeight: "semibold",
              _selected: {
                color: "purple",
                borderColor: "purple",
                borderTopColor: "purple",
                borderBottomColor: "purple",
              },
              _active: {
                color: "purple",
              },
            },
          },
        },
      },
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
          solid: {},
          link: {
            _hover: {
              color: "purple",
              textDecoration: "none",
            },
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
      Input: {
        baseStyle: {},
        // variants: {
        //   filled: {
        //     field: {
        //       boxShadow: "md",
        //       bg: "black",
        //       _hover: {
        //         bg: "black",
        //       },
        //       _focus: {
        //         bg: "black",
        //         boxShadow: ["0", "red"],
        //       },
        //     },
        //   },
        // },
        defaultProps: {
          variant: "filled",
          focusBorderColor: "purple.500",
        },
      },
      Link: {
        baseStyle: {
          color: "purple.300",
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "purple",
  })
);

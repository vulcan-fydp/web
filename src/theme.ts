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
      Text: {
        variants: {
          heading1: {
            fontSize: ["3xl", "6xl"],
            fontWeight: "bold",
            textAlign: "center",
            maxW: "calc(100% - 40px)",
          },
          heading2: {
            fontSize: ["2xl", "3xl"],
            fontWeight: "bold",
            textAlign: "center",
            maxW: "calc(100% - 40px)",
          },
        },
      },
      Tabs: {
        baseStyle: {
          tabpanel: {
            padding: "20px 0",
          },
        },
        variants: {
          line: {
            tab: {
              color: "white",
              fontWeight: "semibold",
              _selected: {
                color: "purple.400",
                borderColor: "purple.400",
                borderTopColor: "purple.400",
                borderBottomColor: "purple.400",
              },
              _active: {
                color: "purple.400",
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
            color: "purple.700",
            textDecoration: "none",
          },
        },
      },
      Input: {
        baseStyle: {},
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
      Skeleton: {
        baseStyle: {
          borderRadius: "md",
          opacity: "0.5",
        },
        defaultProps: {
          startColor: "purple.400",
          endColor: "purple.600",
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "purple",
  })
);

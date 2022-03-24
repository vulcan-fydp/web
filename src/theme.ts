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
      medPurple: {
        100: "#bfa3d9",
        200: "#a075c5",
        300: "#8047b2",
        400: "#60199f",
        500: "#4d147f",
        600: "#3a0f5f",
        700: "#260a40",
        800: "#130520",
        900: "#000000",
      },
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
              fontWeight: "regular",
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
          color: "white",
          fontWeight: "regular",
        },
        variants: {
          solid: ({ colorScheme }: any) => {
            return {
              color: "white",
              background: `${colorScheme}.500`,
            };
          },
          primary: {
            color: "white",
            background: "medPurple.500",
            _hover: `bg: medPurple.600`,
          },
          link: {
            _hover: {},
          },
          outline: {
            borderWidth: "1px",
            borderColor: "brightPurple.400",
          },
          transparent: {
            boxShadow: "none",
            background: "rgba(255,0,0,0)",
            _hover: "bg: rgba(255, 0, 0, 1.0)",
            _focus: "boxShadow: none; bg: rgba(255, 0, 0, 0.0)",
          },
        },
        kickLink: {
          color: "purple.400",
          textDecoration: "none",
          height: "28px",
          padding: "0 12px",
          _hover: {
            color: "purple.700",
            textDecoration: "none",
          },
        },
      },
      IconButton: {
        variants: {
          transparent: {
            bg: "rgba(255,0,0,0)",
            _hover: "bg: rgba(255, 0, 0, 0.0)",
            _focus: "boxShadow: none; bg: rgba(255, 0, 0, 0.0)",
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

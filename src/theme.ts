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
      black: "#131313",
      grey: "#434343",
      yellow: {
        100: "#fefce7",
        200: "#fdf9d0",
        300: "#fcf6b8",
        400: "#fbf3a1",
        500: "#faf089",
        600: "#c8c06e",
        700: "#969052",
        800: "#646037",
        900: "#32301b",
      },
      darkPurple: {
        100: "#7a6883",
        200: "#644f6e",
        300: "#4e3559",
        400: "#381c45",
        500: "#220330",
        600: "#1f032b",
        700: "#1b0226",
        800: "#14021d",
        900: "#110218",
      },
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
      brightPurple: {
        // https://maketintsandshades.com/#C355F5
        100: "#e7bbfb",
        200: "#db99f9",
        300: "#cf77f7",
        400: "#c355f5",
        500: "#9c44c4",
        600: "#753393",
        700: "#4e2262",
        800: "#271131",
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
              // fontWeight: "semibold",
              _selected: {
                color: "yellow.400",
                borderColor: "yellow.400",
                borderTopColor: "yellow.400",
                borderBottomColor: "yellow.400",
              },
              _active: {
                color: "yellow.400",
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
          fontWeight: "400",
        },
        variants: {
          solid: ({ colorScheme }: any) => {
            return {
              color: "white",
              background: `${colorScheme}.500`,
            };
          },
          link: {
            _hover: {
              color: "purple",
              textDecoration: "none",
            },
          },
          outline: {
            borderWidth: "2px",
            borderColor: "brightPurple.400",
          },
          transparent: {
            background: "rgba(255,0,0,0)",
            _hover: "bg: rgba(255, 0, 0, 0.0)",
            _focus: "boxShadow: none; bg: rgba(255, 0, 0, 0.0)",
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
          focusBorderColor: "brightPurple.400",
        },
      },
      Link: {
        baseStyle: {
          color: "brightPurple.400",
        },
      },
      Skeleton: {
        baseStyle: {
          borderRadius: "md",
          opacity: "0.5",
        },
        defaultProps: {
          startColor: "brightPurple.300",
          endColor: "brightPurple.400",
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brightPurple",
  })
);

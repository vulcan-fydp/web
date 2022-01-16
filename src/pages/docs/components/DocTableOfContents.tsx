import { Box, Text, Button, VStack, Link, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
// import { Link } from "react-router-dom";
import { useDocContent } from "./doc-content";

const focusedStyles = {
  fontWeight: "bold",
  color: "brightPurple.400",
} as const;

const unfocusedStyles = {
  color: "white",
};

export const DocTableOfContents = () => {
  const { title, subtitles, focusedId } = useDocContent();

  const getStyles = useCallback(
    (id: string) => {
      if (id === focusedId) {
        return focusedStyles;
      }

      return unfocusedStyles;
    },
    [focusedId]
  );

  if (title) {
    return (
      <Flex
        borderRadius="md"
        borderColor="brightPurple.400"
        borderWidth="2px"
        padding="10px"
        flexDir="column"
        alignItems="left"
        textAlign="left"
      >
        <Link
          {...getStyles(title.id)}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(title.id)?.scrollIntoView();
          }}
          href=""
        >
          {title.text}
        </Link>
        {subtitles.map((subtitle) => (
          <Link
            key={subtitle.text}
            ml="10px"
            mt="2px"
            {...getStyles(subtitle.id)}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(subtitle.id)?.scrollIntoView();
            }}
            variant="link"
            display="block"
            href=""
          >
            {subtitle.text}
          </Link>
        ))}
      </Flex>
    );
  }

  return null;
};

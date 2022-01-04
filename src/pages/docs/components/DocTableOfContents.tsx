import { Box, Text } from "@chakra-ui/layout";
import { useCallback } from "react";
import { useDocContent } from "./doc-content";

const focusedStyles = {
  fontWeight: "bold",
  color: "purple.300",
} as const;

const unfocusedStyles = {};

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
      <Box
        borderRadius="md"
        borderColor="purple.300"
        borderWidth="2px"
        padding="10px"
      >
        <Text {...getStyles(title.id)}>{title.text}</Text>
        {subtitles.map((subtitle) => (
          <Text key={subtitle.text} ml="10px" {...getStyles(subtitle.id)}>
            {subtitle.text}
          </Text>
        ))}
      </Box>
    );
  }

  return null;
};

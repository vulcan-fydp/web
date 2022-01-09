import { Box } from "@chakra-ui/layout";
import { memo } from "react";

function trim(text: string) {
  text = text.trimEnd();
  text = text.replace(/^\s\n*( *)/, "$1");

  let minIndent = Number.MAX_SAFE_INTEGER;

  let lines = text.split("\n");

  lines.forEach((line) => {
    if (line.trim().length > 0) {
      minIndent = Math.min(minIndent, line.length - line.trim().length);
    }
  });

  lines = lines.map((line) => {
    if (line.trim().length > 0) {
      return line.substr(minIndent);
    } else {
      return "";
    }
  });

  return lines.join("\n");
}

interface DocCodeBlockProps {
  children: string;
}

/**
 * Inserts a code block
 *
 * @example
 * <DocCodeBlock>{`
 *   You shouldn't write text directly in the component.
 *   Instead pass in a string literal so that whitespace is preserved.
 *   This also does some formatting such as finding the smallest indent
 *   of all non-empty lines and de-indenting to that level so that your
 *   code block can look visually appealing with the rest of your code
 *   while being formatted nicely onscreen too.
 * `}</DocCodeBlock>
 */
export const DocCodeBlock: React.FC<DocCodeBlockProps> = memo(
  ({ children }) => {
    return (
      <Box
        fontFamily="mono"
        whiteSpace="pre"
        backgroundColor="gray.700"
        borderRadius="md"
        padding="10px 20px"
        overflowX="auto"
        mt="10px"
      >
        {trim(children)}
      </Box>
    );
  }
);

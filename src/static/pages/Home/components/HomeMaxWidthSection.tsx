import { Box } from "@chakra-ui/react";

export const HomeMaxWidthSection: React.FC = ({ children }) => (
  <Box
    w={{ base: "calc(100vw - 40px)", sm: "calc(100vw - 160px)" }}
    maxW="1000px"
    margin="150px auto 0"
  >
    {children}
  </Box>
);

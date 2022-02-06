import { Text } from "@chakra-ui/react";

export const HomeSectionTitle: React.FC = ({ children }) => (
  <Text
    as="h2"
    color="purple.400"
    fontSize={{ base: "3xl", lg: "5xl" }}
    fontWeight="bold"
    mb={{ base: "40px", lg: "80px" }}
  >
    {children}
  </Text>
);

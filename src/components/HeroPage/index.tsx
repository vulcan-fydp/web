import React from "react";
import { Navbar } from "components/Navbar";
import { VStack, Box } from "@chakra-ui/layout";

export const HeroPage: React.FC = ({ children }) => {
  return (
    <Box background="linear-gradient(132.85deg, #30292F 0%, #413F54 100%);">
      <Navbar />
      <VStack pt="80px" minHeight="100vh">
        {children}
      </VStack>
    </Box>
  );
};

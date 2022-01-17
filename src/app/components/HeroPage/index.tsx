import React from "react";
import { Navbar } from "app/components/Navbar";
import { Flex, Box } from "@chakra-ui/layout";

interface HeroProps {
  isDashboard?: boolean;
}

export const HeroPage: React.FC<HeroProps> = ({ children, isDashboard }) => {
  return (
    <Box
      background={
        isDashboard
          ? "black"
          : "linear-gradient(132.85deg, #30292F 0%, #413F54 100%);"
      }
    >
      <Navbar />
      <Flex pt="80px" minHeight="100vh" flexDir="column" align="center">
        {children}
      </Flex>
    </Box>
  );
};

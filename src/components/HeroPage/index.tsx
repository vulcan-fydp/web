import React from "react";
import { Navbar } from "components/Navbar";
import { Flex, Box } from "@chakra-ui/layout";

interface HeroProps {
  isDashboard?: boolean;
}

export const HeroPage: React.FC<HeroProps> = ({ children, isDashboard }) => {
  return (
    <Box background="black">
      <Navbar />
      <Flex pt="80px" minHeight="100vh" flexDir="column" align="center">
        {children}
      </Flex>
    </Box>
  );
};

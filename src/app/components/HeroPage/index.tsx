import React from "react";
import { DefaultNavbar } from "app/components/Navbar";
import { Flex, Box } from "@chakra-ui/layout";
import { useNavbarHeight } from "lib/Navbar";

interface HeroProps {
  isDashboard?: boolean;
}

const HeroPageContent: React.FC = ({ children }) => {
  const navbarHeight = useNavbarHeight();

  return (
    <Flex
      pt={`${navbarHeight + 30}px`}
      minHeight="100vh"
      flexDir="column"
      align="center"
    >
      {children}
    </Flex>
  );
};

export const HeroPage: React.FC<HeroProps> = ({ children, isDashboard }) => {
  return (
    <Box background={"black"}>
      <DefaultNavbar>
        <HeroPageContent>{children}</HeroPageContent>
      </DefaultNavbar>
    </Box>
  );
};

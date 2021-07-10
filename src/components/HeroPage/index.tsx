import React from "react";
import { Navbar } from "components/Navbar";
import { VStack } from "@chakra-ui/layout";

export const HeroPage: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <VStack>{children}</VStack>
    </>
  );
};

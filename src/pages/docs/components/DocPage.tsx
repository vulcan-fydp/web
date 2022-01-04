import { Box, Flex, Center } from "@chakra-ui/react";
import { useEffect, useLayoutEffect } from "react";
import { useRouteMatch } from "react-router";
import { DocContentContextProvider } from "./doc-content";
import { DocTableOfContents } from "./DocTableOfContents";

export const DocPage: React.FC = ({ children }) => {
  return (
    <DocContentContextProvider>
      <Center>
        <Flex maxW="1000px" alignItems="flex-start">
          <Box textAlign="left" w="80%" pr="50px">
            {children}
          </Box>
          <Box w="20%" mt="30px" position="sticky" top="30px">
            <DocTableOfContents />
          </Box>
        </Flex>
      </Center>
    </DocContentContextProvider>
  );
};

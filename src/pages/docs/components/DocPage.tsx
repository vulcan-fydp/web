import {
  Box,
  Flex,
  Center,
  useToken,
  useMediaQuery,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useEffect, useLayoutEffect } from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { DocsRoutes } from "..";
import { DocContentContextProvider } from "./doc-content";
import { DocTableOfContents } from "./DocTableOfContents";
import { DocTitle } from "./DocTitle";

interface DocPageProps {
  title: string;
}

export const DocPage: React.FC<DocPageProps> = ({ children, title }) => {
  const lgBreakpoint = useToken("breakpoints", "lg");
  const [isDesktop] = useMediaQuery(`(min-width: ${lgBreakpoint})`);

  return (
    <DocContentContextProvider>
      {isDesktop ? (
        <Center>
          <Flex maxW="1000px" alignItems="flex-start">
            <Box textAlign="left" w="80%" pr="50px">
              <DocTitle>{title}</DocTitle>
              <Breadcrumb ml="10px" mt="10px" mb="10px" color="yellow">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem as={Link} to={DocsRoutes.base()}>
                  <BreadcrumbLink>Docs</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              {children}
            </Box>
            <Box w="20%" mt="30px" position="sticky" top="30px">
              <DocTableOfContents />
            </Box>
          </Flex>
        </Center>
      ) : null}
      {!isDesktop ? (
        <Flex flexDir="column" margin="0 20px">
          <DocTitle>{title}</DocTitle>
          <Breadcrumb ml="10px" mt="10px" mb="10px" color="yellow">
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem as={Link} to={DocsRoutes.base()}>
              <BreadcrumbLink>Docs</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box>
            <DocTableOfContents />
          </Box>
          <Box textAlign="left" mt="10px">
            {children}
          </Box>
        </Flex>
      ) : null}
    </DocContentContextProvider>
  );
};

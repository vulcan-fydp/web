import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Flex,
  useMediaQuery,
  useToken,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DocsSidebar } from "../generated/DocsSidebar.generated";
import { DocContentContextProvider } from "./doc-content";
import { DocTableOfContents } from "./DocTableOfContents";
import { DocTitle } from "./DocTitle";

interface DocPageProps {
  title: string;
  breadcrumbPieces: [string, string][];
}

export const DocPage: React.FC<DocPageProps> = ({
  children,
  title,
  breadcrumbPieces,
}) => {
  const lgBreakpoint = useToken("breakpoints", "lg");
  const [isDesktop] = useMediaQuery(`(min-width: ${lgBreakpoint})`);

  const breadcrumbs = useMemo(() => {
    let currentPath = "";
    return breadcrumbPieces.map(([shortTitle, pathPiece], i, arr) => {
      currentPath += pathPiece;
      return (
        <BreadcrumbItem key={shortTitle}>
          <BreadcrumbLink as={Link} to={currentPath}>
            {shortTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    });
  }, [breadcrumbPieces]);

  return (
    <DocContentContextProvider>
      {isDesktop ? (
        <Center>
          <Flex alignItems="flex-start" width="100%">
            <Box w="250px" pl="20px" pr="20px" mt="30px">
              <DocsSidebar />
            </Box>
            <Box textAlign="left" flex="0 1 800px" pr="50px">
              <DocTitle>{title}</DocTitle>
              <Breadcrumb ml="10px" mt="10px" mb="10px" color="yellow.300">
                {breadcrumbs}
              </Breadcrumb>
              {children}
            </Box>
            <Box flex="0 0 200px" mt="30px" position="sticky" top="30px">
              <DocTableOfContents />
            </Box>
          </Flex>
        </Center>
      ) : null}
      {!isDesktop ? (
        <Flex flexDir="column" margin="0 20px">
          <DocTitle>{title}</DocTitle>
          <Breadcrumb ml="10px" mt="10px" mb="10px" color="yellow.300">
            {breadcrumbs}
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

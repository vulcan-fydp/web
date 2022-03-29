import { Box, Flex, Text } from "@chakra-ui/react";
import { HomeMaxWidthSection } from "./components/HomeMaxWidthSection";
import { HomeSectionTitle } from "./components/HomeSectionTitle";
import { WorldMap } from "./WorldMap";

export const PlayAnywhereSection = () => {
  return (
    <>
      <HomeMaxWidthSection>
        <HomeSectionTitle>Play With Friends Around The World</HomeSectionTitle>
        <Flex align="left" gap="40px" flexDir="column" mb="60px">
          <Text flex="1 1 auto" maxWidth="600px">
            Once the Vulcan Gaming Platform is deployed, joining a game is as
            simple as going to a web page in your web browser. No controller
            required!
          </Text>
        </Flex>
        <Box display="block">
          <Box
            display="block"
            position="relative"
            width="100%"
            overflow="visible"
          >
            <WorldMap color={"#FFFFFF"} />
          </Box>
        </Box>
      </HomeMaxWidthSection>
    </>
  );
};

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { HomeMaxWidthSection } from "./components/HomeMaxWidthSection";
import { HomeSectionTitle } from "./components/HomeSectionTitle";
import PlayingRemotelyTogetherSrc from "static/resources/playing-together-remotely.jpg";

export const AboutSection = () => {
  return (
    <HomeMaxWidthSection>
      <HomeSectionTitle>Level Up Your Online Game Night</HomeSectionTitle>
      <Flex align="center" gap="40px" flexDir={{ base: "column", lg: "row" }}>
        <Text flex="1 1 auto">
          In a world filled with social distancing, getting together with friends
          on a couch to play video games has never been harder. With the Vulcan
          Gaming Platform we bring the couch online.
          <br />
          <br />
          But how is this different from normal online multiplayer? Only 1
          person has to own the console and the game!
        </Text>
        <Box flex={{ base: "0", lg: "0 0 400px" }}>
          <Image
            src={PlayingRemotelyTogetherSrc}
            borderWidth="4px"
            borderColor="yellow.300"
            borderStyle="solid"
            borderRadius="8px"
          />
        </Box>
      </Flex>
    </HomeMaxWidthSection>
  );
};

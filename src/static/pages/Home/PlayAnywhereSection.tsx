import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { HomeMaxWidthSection } from "./components/HomeMaxWidthSection";
import { HomeSectionTitle } from "./components/HomeSectionTitle";
import { WorldMap } from "./WorldMap";
import ControllerWaypoint from "static/resources/controller-waypoint.png";
import LaptopWaypoint from "static/resources/laptop-waypoint.png";
import SwitchWaypoint from "static/resources/switch-waypoint.png";

export const PlayAnywhereSection = () => {
  return (
    <>
      <HomeMaxWidthSection>
        <HomeSectionTitle>Play With Friends Around The World</HomeSectionTitle>
        <Flex align="left" gap="40px" flexDir="column">
          <Text flex="1 1 auto" maxWidth="600px">
            Once the Vulcan Gaming Platform is deployed, joining a game is as
            simple as going to a web page in your web browser. No controller
            required!
          </Text>
          <Box height="47vw">
            <Box width="100vw" position="absolute" left="calc(-50vw + 50%)">
              <WorldMap color={"#FFFFFF"} />
            </Box>
            <Box position="absolute" top="1%" left="52%">
              <Image src={ControllerWaypoint} />
            </Box>
          </Box>
        </Flex>
      </HomeMaxWidthSection>
      {/* <Box height="45vh" overflow="hidden" position="relative" mt="40px">
        
      </Box> */}
    </>
  );
};

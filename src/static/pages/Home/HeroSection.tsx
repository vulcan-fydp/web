import { Box, Button, Image, Text } from "@chakra-ui/react";
import SkylineImg from "static/resources/skyline-2.png";
import TelevisionImgSrc from "static/resources/hero-tv.jpg";
import DeskImgSrc from "static/resources/hero-desk.jpg";
import BedroomImgSrc from "static/resources/hero-bedroom.jpg";
import CouchImgSrc from "static/resources/hero-couch.jpg";
import TestScreenImgSrc from "static/resources/test-screen.png";
import { useEffect, useRef, useState } from "react";

const SKYLINE_IMG_WIDTH = 900;
const SKYLINE_IMG_HEIGHT = 263;

const SKYLINE_HEIGHT = 300;
const SKYLINE_WIDTH = (SKYLINE_IMG_WIDTH * SKYLINE_HEIGHT) / SKYLINE_IMG_HEIGHT;

const SKYLINE_LIGHT_SIZE = 8;

function getSkylineLight(
  x: number,
  y: number,
  scale: number
): { left: string; right: string; bottom: string; top: string } {
  return {
    left: `${x * scale}px`,
    right: `calc(100% - ${x * scale}px - ${SKYLINE_LIGHT_SIZE * scale}px)`,
    bottom: `${y * scale}px`,
    top: `calc(100vh - ${y * scale}px - ${SKYLINE_LIGHT_SIZE * scale}px)`,
  };
}

function getSkylineLightPositions(screenWidth: number) {
  const scale = Math.min(1, screenWidth / SKYLINE_WIDTH);

  return [
    getSkylineLight(310, 170, scale),
    getSkylineLight(500, 140, scale),
    getSkylineLight(630, 250, scale),
    getSkylineLight(900, 140, scale),
  ];
}

const TelevisionImage = () => (
  <Box
    borderRadius="10px"
    borderColor="yellow.300"
    borderWidth="4px"
    position="relative"
  >
    <Image src={TelevisionImgSrc} borderRadius="4px" />
    <Box
      position="absolute"
      top="81px"
      left="114px"
      right="112px"
      objectFit="contain"
    >
      <Image src={TestScreenImgSrc} objectFit="contain" />
    </Box>
  </Box>
);

const DeskImage = () => (
  <Box
    borderRadius="10px"
    borderColor="yellow.300"
    borderWidth="4px"
    position="relative"
  >
    <Image src={DeskImgSrc} borderRadius="4px" />
    <Box
      position="absolute"
      top="22px"
      left="205px"
      right="62px"
      objectFit="contain"
    >
      <Image src={TestScreenImgSrc} objectFit="contain" />
    </Box>
  </Box>
);

const BedroomImage = () => (
  <Box
    borderRadius="10px"
    borderColor="yellow.300"
    borderWidth="4px"
    position="relative"
  >
    <Image src={BedroomImgSrc} borderRadius="4px" />
    <Box
      position="absolute"
      top="159px"
      left="139px"
      right="203px"
      objectFit="contain"
    >
      <Image src={TestScreenImgSrc} objectFit="contain" />
    </Box>
  </Box>
);

const CouchImage = () => (
  <Box
    borderRadius="10px"
    borderColor="yellow.300"
    borderWidth="4px"
    position="relative"
  >
    <Image src={CouchImgSrc} borderRadius="4px" />
    <Box
      position="absolute"
      top="165px"
      left="154px"
      right="191px"
      objectFit="contain"
    >
      <Image src={TestScreenImgSrc} objectFit="contain" />
    </Box>
  </Box>
);

export const HeroSection: React.FC = () => {
  const [skylineLightPositions, setSkylineLightPositions] = useState(
    getSkylineLightPositions(document.body.clientWidth)
  );

  useEffect(() => {
    const onResize = () => {
      setSkylineLightPositions(
        getSkylineLightPositions(document.body.clientWidth)
      );
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setSkylineLightPositions]);

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Box position="absolute" top="20px" left="20px">
        <Text
          fontSize={{ base: "4xl", md: "6xl" }}
          color="purple.400"
          fontWeight="bold"
        >
          Vulcan Gaming
        </Text>
        <Text>
          Bring your console to your friends! &nbsp;
          <Button mt="10px" variant="link">
            Get Started!
          </Button>
        </Text>
      </Box>
      <Box
        position="absolute"
        top="50px"
        right="200px"
        left="calc(100vw - 400px - 200px)"
        bottom="calc(100vh - 300px - 50px)"
      >
        <CouchImage />
      </Box>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        top="calc(100vh - 300px)"
        backgroundImage={`url(${SkylineImg})`}
        backgroundSize="contain"
        backgroundRepeat="repeat-x"
        backgroundPosition="left bottom"
      ></Box>
      {skylineLightPositions.map((pos) => (
        <Box
          key={pos.left}
          position="absolute"
          backgroundColor="yellow.300"
          {...pos}
        />
      ))}
    </Box>
  );
};

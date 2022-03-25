import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import BedroomImgSrc from "static/resources/hero-bedroom.jpg";
import CouchImgSrc from "static/resources/hero-couch.jpg";
import DeskImgSrc from "static/resources/hero-desk.jpg";
import TelevisionImgSrc from "static/resources/hero-tv.jpg";
import SkylineImg from "static/resources/skyline-2.png";
import TestScreenImgSrc from "static/resources/test-screen.png";
import SmashVideo1 from "static/resources/smash1.webp";
import MarioKartVideo1 from "static/resources/mariokart1.webp";

const SKYLINE_IMG_WIDTH = 900;
const SKYLINE_IMG_HEIGHT = 263;

const SKYLINE_HEIGHT = 300;
const SKYLINE_WIDTH = (SKYLINE_IMG_WIDTH * SKYLINE_HEIGHT) / SKYLINE_IMG_HEIGHT;

const SKYLINE_LIGHT_SIZE = 8;

/**
 * @param x - Relative to middle of screen (right is +)
 * @param y - Relative to bottom of screen (up is +)
 */
function getSkylineLight(
  x: number,
  y: number,
  scale: number
): { left: string; right: string; bottom: string; top: string } {
  return {
    left: `calc(50% + ${x * scale}px)`,
    right: `calc(50% - ${x * scale}px - ${SKYLINE_LIGHT_SIZE * scale}px)`,
    bottom: `${y * scale}px`,
    top: `calc(100vh - ${y * scale}px - ${SKYLINE_LIGHT_SIZE * scale}px)`,
  };
}

function getSkylineLightPositions(screenWidth: number) {
  const scale = Math.min(1, screenWidth / SKYLINE_WIDTH);

  return [
    getSkylineLight(-200, 140, scale),
    getSkylineLight(-10, 190, scale),
    getSkylineLight(130, 220, scale),
    getSkylineLight(300, 170, scale),
  ];
}

interface InsideViewImageProps {
  videoSrc: string;
}

const TelevisionImage: React.FC<InsideViewImageProps> = ({ videoSrc }) => (
  <Box borderColor="yellow.300" borderWidth="4px" position="relative">
    <Image src={TelevisionImgSrc} />
    <Box
      position="absolute"
      top="27%"
      left="28.5%"
      right="28%"
      objectFit="contain"
    >
      <Image src={videoSrc} objectFit="contain" />
    </Box>
  </Box>
);

const DeskImage: React.FC<InsideViewImageProps> = ({ videoSrc }) => (
  <Box borderColor="yellow.300" borderWidth="4px" position="relative">
    <Image src={DeskImgSrc} />
    <Box
      position="absolute"
      top="7.333%"
      left="52%"
      right="15.5%"
      objectFit="contain"
    >
      <Image src={videoSrc} objectFit="contain" />
    </Box>
  </Box>
);

const BedroomImage: React.FC<InsideViewImageProps> = ({ videoSrc }) => (
  <Box borderColor="yellow.300" borderWidth="4px" position="relative">
    <Image src={BedroomImgSrc} />
    <Box
      position="absolute"
      top="54.5%"
      left="35.5%"
      right="51.75%"
      objectFit="contain"
    >
      <Image src={videoSrc} objectFit="contain" />
    </Box>
  </Box>
);

const CouchImage: React.FC<InsideViewImageProps> = ({ videoSrc }) => (
  <Box borderColor="yellow.300" borderWidth="4px" position="relative">
    <Image src={CouchImgSrc} />
    <Box
      position="absolute"
      top="56.25%"
      left="39.25%"
      right="49%"
      objectFit="contain"
    >
      <Image src={videoSrc} objectFit="contain" />
    </Box>
  </Box>
);

const InsideViewImages = [TelevisionImage, DeskImage, BedroomImage, CouchImage];
const InsideViewVideoSrcs = [SmashVideo1, MarioKartVideo1];

const NUM_ROOMS = 4;
const projectionStyles = {
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  backgroundColor: "yellow.300",
  opacity: "0.2",
} as const;

export const HeroSection: React.FC = () => {
  const [skylineLightPositions, setSkylineLightPositions] = useState(
    getSkylineLightPositions(document.body.clientWidth)
  );

  const skylineLightRefs: React.RefObject<HTMLDivElement>[] = [];
  const roomRefs: React.RefObject<HTMLDivElement>[] = [];
  for (let i = 0; i < NUM_ROOMS; i++) {
    // Don't do this at home kids, NUM_ROOMS is a constant
    // eslint-disable-next-line react-hooks/rules-of-hooks
    skylineLightRefs.push(useRef<HTMLDivElement>(null));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    roomRefs.push(useRef<HTMLDivElement>(null));
  }

  const topProjectionRef = useRef<HTMLDivElement>(null);
  const rightProjectionRef = useRef<HTMLDivElement>(null);
  const bottomProjectionRef = useRef<HTMLDivElement>(null);
  const leftProjectionRef = useRef<HTMLDivElement>(null);

  const [insideViewImageIndex, setInsideViewImageIndex] = useState(0);
  const [insideViewVideoSrcIndex, setInsideViewVideoSrcIndex] = useState(0);

  const positionProjections = useCallback(() => {
    const skylineLightDiv = skylineLightRefs[insideViewImageIndex].current;
    const roomDiv = roomRefs[insideViewImageIndex].current;
    if (!skylineLightDiv || !roomDiv) {
      return;
    }

    if (topProjectionRef.current) {
      const x1 = skylineLightDiv.offsetLeft;
      const x2 = roomDiv.offsetLeft;
      const x3 = roomDiv.offsetLeft + roomDiv.offsetWidth;
      const x4 = skylineLightDiv.offsetLeft + skylineLightDiv.offsetWidth;
      const y14 = skylineLightDiv.offsetTop;
      const y23 = roomDiv.offsetTop;
      topProjectionRef.current.style.clipPath = `polygon(${x1}px ${y14}px, ${x2}px ${y23}px, ${x3}px ${y23}px, ${x4}px ${y14}px)`;
    }

    if (rightProjectionRef.current) {
      const x14 = skylineLightDiv.offsetLeft + skylineLightDiv.offsetWidth;
      const x23 = roomDiv.offsetLeft + roomDiv.offsetWidth;
      const y1 = skylineLightDiv.offsetTop;
      const y2 = roomDiv.offsetTop;
      const y3 = roomDiv.offsetTop + roomDiv.offsetHeight;
      const y4 = skylineLightDiv.offsetTop + skylineLightDiv.offsetHeight;
      rightProjectionRef.current.style.clipPath = `polygon(${x14}px ${y1}px, ${x23}px ${y2}px, ${x23}px ${y3}px, ${x14}px ${y4}px)`;
    }

    if (bottomProjectionRef.current) {
      const x1 = skylineLightDiv.offsetLeft;
      const x2 = roomDiv.offsetLeft;
      const x3 = roomDiv.offsetLeft + roomDiv.offsetWidth;
      const x4 = skylineLightDiv.offsetLeft + skylineLightDiv.offsetWidth;
      const y14 = skylineLightDiv.offsetTop + skylineLightDiv.offsetHeight;
      const y23 = roomDiv.offsetTop + skylineLightDiv.offsetHeight;
      bottomProjectionRef.current.style.clipPath = `polygon(${x1}px ${y14}px, ${x2}px ${y23}px, ${x3}px ${y23}px, ${x4}px ${y14}px)`;
    }

    if (leftProjectionRef.current) {
      const x14 = skylineLightDiv.offsetLeft;
      const x23 = roomDiv.offsetLeft;
      const y1 = skylineLightDiv.offsetTop;
      const y2 = roomDiv.offsetTop;
      const y3 = roomDiv.offsetTop + roomDiv.offsetHeight;
      const y4 = skylineLightDiv.offsetTop + skylineLightDiv.offsetHeight;
      leftProjectionRef.current.style.clipPath = `polygon(${x14}px ${y1}px, ${x23}px ${y2}px, ${x23}px ${y3}px, ${x14}px ${y4}px)`;
    }
  }, [
    ...skylineLightRefs,
    ...roomRefs,
    insideViewImageIndex,
    topProjectionRef,
    rightProjectionRef,
    bottomProjectionRef,
    leftProjectionRef,
  ]);

  useEffect(() => {
    positionProjections();
  }, [positionProjections, insideViewImageIndex]);

  useEffect(() => {
    positionProjections();

    const onResize = () => {
      setSkylineLightPositions(
        getSkylineLightPositions(document.body.clientWidth)
      );
      positionProjections();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setSkylineLightPositions, positionProjections]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsideViewImageIndex((idx) => (idx + 1) % InsideViewImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [setInsideViewImageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsideViewVideoSrcIndex(
        (idx) => (idx + 1) % InsideViewVideoSrcs.length
      );
    }, 20000);

    return () => clearInterval(interval);
  }, [setInsideViewVideoSrcIndex]);

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex
        margin="0 auto"
        maxWidth="1200px"
        pt={{ base: "60px", md: "100px" }}
        pl="20px"
        pr="20px"
        pb={{ base: "100px", sm: "150px", md: "200px" }}
        gap="20px"
        height="100vh"
        justifyContent="space-between"
        flexDir={{ base: "column", lg: "row" }}
        zIndex="999"
      >
        <Box>
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
      </Flex>

      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        top="calc(100vh - 300px)"
        backgroundImage={`url(${SkylineImg})`}
        backgroundSize="contain"
        backgroundRepeat="repeat-x"
        backgroundPosition="center bottom"
        zIndex="0"
      ></Box>
      <Box {...projectionStyles} ref={leftProjectionRef} />
      <Box {...projectionStyles} ref={topProjectionRef} />
      <Box {...projectionStyles} ref={rightProjectionRef} />
      <Box {...projectionStyles} ref={bottomProjectionRef} />
      {InsideViewImages.map((InsideViewImage, i) => (
        <Box
          position="absolute"
          // base: 320x240
          // md: 480x360
          // lg: 400x300
          top={{
            base: "calc(50% - 160px)",
            md: "calc(50% - 200px)",
            lg: "100px",
          }}
          left={{
            base: "calc(50% - 160px)",
            md: "calc(50% - 240px)",
            lg: "calc(50% + 50px)",
          }}
          bottom={{
            base: "calc(50% - 80px)",
            md: "calc(50% - 160px)",
            lg: "calc(100% - 100px - 300px)",
          }}
          right={{
            base: "calc(50% - 160px)",
            md: "calc(50% - 240px)",
            lg: "calc(50% - 50px - 400px)",
          }}
          key={i}
          opacity={i === insideViewImageIndex ? 1 : 0}
          ref={roomRefs[i]}
        >
          <InsideViewImage
            videoSrc={InsideViewVideoSrcs[insideViewVideoSrcIndex]}
          />
        </Box>
      ))}
      {skylineLightPositions.map((pos, i) => (
        <Box
          key={pos.left}
          position="absolute"
          backgroundColor="yellow.300"
          ref={skylineLightRefs[i]}
          {...pos}
        />
      ))}
    </Box>
  );
};

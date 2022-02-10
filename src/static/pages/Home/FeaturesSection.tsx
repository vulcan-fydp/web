import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Tag,
  Text,
  useMediaQuery,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { HomeMaxWidthSection } from "./components/HomeMaxWidthSection";
import { HomeSectionTitle } from "./components/HomeSectionTitle";
import PlaceholderImgSrc from "static/resources/placeholder-feature.png";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useAnimation } from "framer-motion";

const FEATURE_VISIBLE_FOR_S = 15;

const MotionBox = motion(Box);

interface FeatureProps {
  imageSrc: string;
  imageAlt: string;
  tags: React.ReactNode[];
  description: string;
  visible: boolean;
}

const Feature: React.FC<FeatureProps> = ({
  description,
  imageAlt,
  imageSrc,
  tags,
  visible,
}) => {
  const controls = useAnimation();

  useLayoutEffect(() => {
    if (visible) {
      controls.start({
        right: ["100%", "0%"],
        transition: {
          duration: FEATURE_VISIBLE_FOR_S,
          ease: "linear",
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, visible]);

  return (
    <Box
      display={visible ? "block" : "none"}
      opacity={visible ? "1" : "0"}
      flex="1 1 100%"
    >
      <Box position="relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
        />
        <MotionBox
          backgroundColor="yellow.300"
          position="absolute"
          top="calc(100% - 5px)"
          left="0"
          bottom="0"
          animate={controls}
        />
      </Box>
      <HStack mt="10px">{tags}</HStack>
      <Text mt="10px">{description}</Text>
    </Box>
  );
};

interface FeaturesProps {
  features: [string, Omit<FeatureProps, "visible">][];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>();

  const lgBreakpoint = useToken("breakpoints", "lg");
  const [isDesktop] = useMediaQuery(`(min-width: ${lgBreakpoint})`);

  const clearFeatureInterval = useCallback(() => {
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [intervalRef]);

  const startFeatureInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setVisibleIndex((idx) => (idx + 1) % features.length);
    }, FEATURE_VISIBLE_FOR_S * 1000);
  }, [intervalRef, features.length]);

  const goToFeature = useCallback(
    (idx: number) => {
      clearFeatureInterval();
      setVisibleIndex(idx);
      startFeatureInterval();
    },
    [clearFeatureInterval, setVisibleIndex, startFeatureInterval]
  );

  useEffect(() => {
    startFeatureInterval();
  }, [startFeatureInterval]);

  if (isDesktop) {
    return (
      <Flex
        justifyContent="space-between"
        alignItems="stretch"
        backgroundColor="purple.400"
        padding="40px"
        borderRadius="3xl"
        gap="20px"
      >
        <VStack flex="0 0 300px" align="flex-start" spacing="10px">
          {features.map(([featureName], i) => (
            <Button
              key={featureName}
              variant="link"
              borderRadius="0"
              paddingLeft="5px"
              borderLeftWidth="2px"
              borderLeftStyle="solid"
              borderLeftColor={
                i === visibleIndex ? "yellow.300" : "transparent"
              }
              onClick={() => goToFeature(i)}
            >
              <Text color="white" fontWeight="400">
                {featureName}
              </Text>
            </Button>
          ))}
        </VStack>
        {features.map(([featureName, featureContent], i) => (
          <Feature
            key={featureName}
            {...featureContent}
            visible={i === visibleIndex}
          />
        ))}
      </Flex>
    );
  }

  return (
    <Box backgroundColor="purple.400" padding="40px" borderRadius="3xl">
      <Box mb="20px" overflowX="scroll" whiteSpace="nowrap">
        {features.map(([featureName], i) => (
          <React.Fragment key={featureName}>
            <Button
              display="inline"
              variant="link"
              borderRadius="0"
              borderLeftColor="yellow.300"
              borderLeftWidth={i === visibleIndex ? "2px" : "0"}
              paddingLeft={i === visibleIndex ? "5px" : "0"}
              onClick={() => goToFeature(i)}
            >
              <Text color="white" fontWeight="400">
                {featureName}
              </Text>
            </Button>
            {i !== features.length - 1 ? (
              <Box m="0 10px" border="0" display="inline-block">
                •
              </Box>
            ) : null}
          </React.Fragment>
        ))}
      </Box>
      {features.map(([featureName, featureContent], i) => (
        <Feature
          key={featureName}
          {...featureContent}
          visible={i === visibleIndex}
        />
      ))}
    </Box>
  );
};

const HostTag = (
  <Tag variant="solid" colorScheme="cyan" key="host">
    Host
  </Tag>
);

const VulcastTag = (
  <Tag variant="solid" colorScheme="yellow" key="vulcast">
    Vulcast
  </Tag>
);

const ClientTag = (
  <Tag variant="solid" colorScheme="pink" key="client">
    Client
  </Tag>
);

export const FeaturesSection = () => {
  return (
    <HomeMaxWidthSection>
      <HomeSectionTitle>All The Features You'll Ever Need</HomeSectionTitle>
      <Features
        features={[
          [
            "Room management",
            {
              imageSrc: PlaceholderImgSrc,
              imageAlt: "A placeholder image",
              tags: [HostTag],
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
          ],
          [
            "Something else",
            {
              imageSrc: PlaceholderImgSrc,
              imageAlt: "A placeholder image",
              tags: [VulcastTag],
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
          ],
        ]}
      />
    </HomeMaxWidthSection>
  );
};

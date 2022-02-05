import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  useMediaQuery,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { useCompositionFunction } from "lib/useCompositionFunction";
import { Link } from "react-router-dom";
import { HomeMaxWidthSection } from "./components/HomeMaxWidthSection";
import { HomeSectionTitle } from "./components/HomeSectionTitle";
import ServerCloudImg from "static/resources/server-cloud.png";
import VulcastImg from "static/resources/vulcast.png";
import JoiningARoomImg from "static/resources/joining-a-room.png";

interface SetUpStepProps {
  stepNumber: number;
  title: string;
  description: string;
  actionText: string;
  actionTo: string;
  imageSrc: string;
  imageAlt: string;
}

const SetUpStep: React.FC<SetUpStepProps> = ({
  stepNumber,
  title,
  description,
  actionText,
  actionTo,
  imageSrc,
  imageAlt,
}) => {
  const lgBreakpoint = useToken("breakpoints", "lg");
  const [isDesktop] = useMediaQuery(`(min-width: ${lgBreakpoint})`);

  if (isDesktop) {
    return (
      <Flex
        flexDirection={stepNumber % 2 === 1 ? "row" : "row-reverse"}
        justifyContent="space-between"
      >
        <Box w="400px">
          <Text fontSize="2xl" color="yellow.300" mb="20px">
            {stepNumber}&nbsp;{title}
          </Text>
          <Text mb="10px">{description}</Text>
          <Button as={Link} to={actionTo}>
            {actionText}
          </Button>
        </Box>
        <Box width="2px" backgroundColor="white" />
        <Center w="400px">
          <Image src={imageSrc} alt={imageAlt} w="200px" />
        </Center>
      </Flex>
    );
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="stretch"
    >
      <Text fontSize="2xl" color="yellow.300">
        {stepNumber}&nbsp;{title}
      </Text>
      <Center w="100%">
        <Image src={imageSrc} alt={imageAlt} w="200px" />
      </Center>
      <Text mb="10px">{description}</Text>
      <Button as={Link} to={actionTo}>
        {actionText}
      </Button>
    </Flex>
  );
};

const PLUS_ONE = (x: number) => x + 1;

export const SetUpSection = () => {
  const step = useCompositionFunction(1, PLUS_ONE);

  return (
    <HomeMaxWidthSection>
      <HomeSectionTitle>Hooked Yet? Let's Get You Set Up</HomeSectionTitle>
      <VStack alignItems="stretch" spacing="50px">
        <SetUpStep
          stepNumber={step()}
          title="Deploy The Web Platform"
          description="The Web Platform is packaged as a Docker Container that can easily be hosted on AWS, Azure, GCP and more! Not tech savvy? No problem, the docs will walk you through it."
          actionText="Ship It"
          actionTo="/docs"
          imageSrc={ServerCloudImg}
          imageAlt="A server deployed in the clouds"
        />
        <SetUpStep
          stepNumber={step()}
          title="Set Up A Vulcast"
          description="A Vulcast is a hardware device that connects to your game console. It handles streaming the video output to over the internet to the web platform and passes controller inputs from other players through to the console"
          actionText="Build It"
          actionTo="/docs"
          imageSrc={VulcastImg}
          imageAlt="A Vulcast"
        />
        <SetUpStep
          stepNumber={step()}
          title="Create A Room"
          description="A room is where people join together to play. Each room has a host who owns a Vulcast that streams the video output from the game console and passes the other players’ actions to the console"
          actionText="Show Me How"
          actionTo="/docs"
          imageSrc={JoiningARoomImg}
          imageAlt="A network of people joined together by the Vulcan Gaming Platform"
        />
      </VStack>
    </HomeMaxWidthSection>
  );
};

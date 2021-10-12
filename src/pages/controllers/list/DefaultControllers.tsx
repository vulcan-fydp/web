import { CopyIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Controller } from "backend-types";
import { ControllerTags } from "components/ControllerTags";
import { useDefaultControllersQuery } from "./defaultControllers.backend.generated";

export const DefaultControllers = () => {
  const { data, loading, error } = useDefaultControllersQuery();

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="400px"
      >
        <Spinner />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="400px"
      >
        Unable to load controllers
      </Box>
    );
  }

  return (
    <VStack alignItems="left" spacing="20px">
      {data.defaultControllers.map((controller) => (
        <DefaultControllerRow controller={controller} key={controller.id} />
      ))}
    </VStack>
  );
};

interface DefaultControllerRowProps {
  controller: Controller;
}

export const DefaultControllerRow: React.FC<DefaultControllerRowProps> = ({
  controller,
}) => {
  return (
    <Flex
      padding="15px 25px"
      align="center"
      backgroundColor="whiteAlpha.50"
      borderRadius="5px"
    >
      <Text fontSize="lg" marginRight="20px">
        {controller.name}
      </Text>
      <ControllerTags controller={controller} isDefaultController />
      <Box flex="1 1 auto" />
      <HStack spacing="5px">
        <Button variant="solid" size="sm" leftIcon={<ViewIcon />}>
          View
        </Button>
        <Button variant="solid" size="sm" leftIcon={<CopyIcon />}>
          Clone
        </Button>
      </HStack>
    </Flex>
  );
};
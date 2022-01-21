import { CopyIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, Spinner } from "@chakra-ui/react";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import { Controller } from "app/backend-types";
import { ControllerTags } from "app/components/ControllerTags";
import { NavLink } from "react-router-dom";
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
        <Button
          as={NavLink}
          to={`/controllers/built-in/${controller.id}`}
          variant="solid"
          size="sm"
          leftIcon={<ViewIcon />}
          colorScheme="orange"
        >
          View
        </Button>
        <Button
          variant="solid"
          size="sm"
          leftIcon={<CopyIcon />}
          colorScheme="cyan"
        >
          Clone
        </Button>
      </HStack>
    </Flex>
  );
};

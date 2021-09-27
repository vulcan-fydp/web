import { useReactiveVar } from "@apollo/client";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Stack, Tag, Text } from "@chakra-ui/react";
import { Controller } from "backend-types";
import { ControllerTags } from "components/ControllerTags";
import { useCallback } from "react";
import { controllerIdVar } from ".";
import { useControllersQuery } from "./controllers.backend.generated";

export const ControllerTab = () => {
  const query = useControllersQuery();
  const controllerId = useReactiveVar(controllerIdVar);

  if (query.loading) {
    return null;
  }

  if (query.error) {
    return <>"Uh oh"</>;
  }

  if (!query.data) {
    return null;
  }

  return (
    <Box>
      <Stack spacing="20px" mt="20px">
        {(query.data.user?.controllers ?? []).map((controller) => (
          <ControllerRow
            controller={controller}
            key={controller.id}
            isDefaultController={false}
            isSelected={controllerId === controller.id}
          />
        ))}
        {query.data.defaultControllers.map((controller) => (
          <ControllerRow
            controller={controller}
            isDefaultController
            key={controller.id}
            isSelected={controllerId === controller.id}
          />
        ))}
      </Stack>
    </Box>
  );
};

interface ControllerRowProps {
  controller: Controller;
  isDefaultController: boolean;
  isSelected: boolean;
}

const ControllerRow: React.FC<ControllerRowProps> = ({
  controller,
  isDefaultController,
  isSelected,
}) => {
  const selectController = useCallback(() => {
    controllerIdVar(controller.id);
  }, [controller]);

  return (
    <Flex
      padding="15px 25px"
      align="center"
      backgroundColor={isSelected ? "purple.800" : "whiteAlpha.50"}
      borderRadius="5px"
    >
      <Text fontSize="lg" marginRight="20px">
        {controller.name}
      </Text>
      <ControllerTags
        controller={controller}
        isDefaultController={isDefaultController}
      />
      <Box flex="1 1 auto" />
      <Button variant="ghost" size="sm">
        <ViewIcon />
      </Button>
      <Button variant="ghost" size="sm">
        <EditIcon />
      </Button>
      <Button
        variant="outline"
        ml="10px"
        size="sm"
        isDisabled={isSelected}
        onClick={selectController}
      >
        Select
      </Button>
    </Flex>
  );
};

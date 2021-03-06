import { useReactiveVar } from "@apollo/client";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Controller } from "app/backend-types";
import { ControllerTags } from "app/components/ControllerTags";
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
    <VStack alignItems="left" spacing="20px">
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
    </VStack>
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
  const isMobile = useBreakpointValue({ base: true, md: false });
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
      <Text fontSize="lg" mr="20px">
        {controller.name}
      </Text>
      {isMobile ? null : (
        <ControllerTags
          controller={controller}
          isDefaultController={isDefaultController}
        />
      )}
      <Box flex="1 1 auto" />
      {isMobile ? null : (
        <Button variant="ghost" size="sm">
          <ViewIcon />
        </Button>
      )}
      {isMobile ? null : (
        <Button variant="ghost" size="sm">
          <EditIcon />
        </Button>
      )}
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

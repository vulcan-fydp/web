import { useReactiveVar } from "@apollo/client";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Stack, Tag, Text } from "@chakra-ui/react";
import { Controller } from "backend-types";
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

function getControllerRequirements(controller: Controller) {
  let requiresGamepad = false;
  let requiresKeyboard = false;
  let requiresMouse = false;
  let requiresTouch = false;
  controller.buttons.forEach((button) => {
    requiresGamepad =
      requiresGamepad || button?.__typename === "ControllerGamepadButton";
    requiresKeyboard =
      requiresKeyboard || button?.__typename === "ControllerKeyboardButton";
    requiresMouse =
      requiresMouse || button?.__typename === "ControllerMouseButton";
    requiresTouch =
      requiresTouch || button?.__typename === "ControllerTouchButton";
  });
  controller.axes.forEach((axis) => {
    requiresGamepad =
      requiresGamepad || axis?.__typename === "ControllerGamepadAxis";
    requiresKeyboard =
      requiresKeyboard || axis?.__typename === "ControllerKeyboardAxis";
    requiresMouse = requiresMouse || axis?.__typename === "ControllerMouseAxis";
    requiresTouch =
      requiresTouch || axis?.__typename === "ControllerTouchJoystickAxis";
  });

  return {
    requiresGamepad,
    requiresKeyboard,
    requiresMouse,
    requiresTouch,
  };
}

interface ControllerTagProps {
  controller: Controller;
  isDefaultController: boolean;
}

const ControllerTags: React.FC<ControllerTagProps> = ({
  controller,
  isDefaultController,
}) => {
  const tags: React.ReactElement[] = [];

  const {
    requiresGamepad,
    requiresKeyboard,
    requiresMouse,
    requiresTouch,
  } = getControllerRequirements(controller);

  if (requiresGamepad) {
    tags.push(
      <Tag variant="solid" colorScheme="blue" key="gamepad">
        Gamepad
      </Tag>
    );
  }

  if (requiresKeyboard) {
    tags.push(
      <Tag variant="solid" colorScheme="pink" key="keyboard">
        Keyboard
      </Tag>
    );
  }

  if (requiresMouse) {
    tags.push(
      <Tag variant="solid" colorScheme="orange" key="mouse">
        Mouse
      </Tag>
    );
  }

  if (requiresTouch) {
    tags.push(
      <Tag variant="solid" colorScheme="yellow" key="touch">
        Touch
      </Tag>
    );
  }

  if (isDefaultController) {
    tags.push(
      <Tag variant="solid" colorScheme="green" key="default">
        Built-in
      </Tag>
    );
  }

  return <HStack spacing="10px">{tags}</HStack>;
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

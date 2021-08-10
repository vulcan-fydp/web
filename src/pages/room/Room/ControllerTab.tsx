import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  StackDivider,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Controller } from "backend-types";
import { useControllersQuery } from "./controllers.backend.generated";
import { ViewIcon, EditIcon } from "@chakra-ui/icons";

export const ControllerTab = () => {
  const query = useControllersQuery();

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
      <Stack divider={<StackDivider borderColor="purple.400" />}>
        {(query.data.user?.controllers ?? []).map((controller) => (
          <ControllerRow
            controller={controller}
            key={controller.id}
            isDefaultController={false}
          />
        ))}
        {query.data.defaultControllers.map((controller) => (
          <ControllerRow
            controller={controller}
            isDefaultController
            key={controller.id}
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

const ControllerTags: React.FC<ControllerProps> = ({
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

interface ControllerProps {
  controller: Controller;
  isDefaultController: boolean;
}

const ControllerRow: React.FC<ControllerProps> = ({
  controller,
  isDefaultController,
}) => {
  return (
    <Flex padding="10px 20px" align="center">
      <Text fontSize="lg" marginRight="20px">
        {controller.name}
      </Text>
      <ControllerTags
        controller={controller}
        isDefaultController={isDefaultController}
      />
      <Box flex="1 1 auto" />
      <Button variant="ghost">
        <ViewIcon />
      </Button>
      <Button variant="ghost">
        <EditIcon />
      </Button>
      <Button variant="outline" ml="10px">
        Select
      </Button>
    </Flex>
  );
};

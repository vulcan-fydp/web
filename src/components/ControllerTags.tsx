import { HStack, Tag } from "@chakra-ui/react";
import { Controller } from "backend-types";

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
  isDefaultController?: boolean;
}

export const ControllerTags: React.FC<ControllerTagProps> = ({
  controller,
  isDefaultController,
}) => {
  const tags: React.ReactElement[] = [];

  const { requiresGamepad, requiresKeyboard, requiresMouse, requiresTouch } =
    getControllerRequirements(controller);

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

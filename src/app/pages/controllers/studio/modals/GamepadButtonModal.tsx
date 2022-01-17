import { Center, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getGamepadButtonText } from "../utils/getGamepadButtonText";
import { ButtonModalComponent, UnsetButton } from "./ButtonModal";

const GAMEPAD_BUTTON_POLL_FREQUENCY_MS = 100;

function getFirstGamepadButtonPressed(): number | undefined {
  for (const gamepad of navigator.getGamepads()) {
    if (gamepad) {
      for (let i = 0; i < gamepad.buttons.length; i++) {
        if (gamepad.buttons[i].pressed) {
          return i;
        }
      }
    }
  }
}

export const GamepadButtonModal: ButtonModalComponent = ({
  isOpen,
  onButtonChange,
  onClose,
}) => {
  const [buttonNumber, setButtonNumber] = useState<number>();

  useEffect(() => {
    setButtonNumber(undefined);
  }, [isOpen, setButtonNumber]);

  useEffect(() => {
    let cleanup = undefined;

    if (isOpen && buttonNumber === undefined) {
      const intervalHandle = setInterval(() => {
        const button = getFirstGamepadButtonPressed();
        if (button !== undefined) {
          setButtonNumber(button);
        }
      }, GAMEPAD_BUTTON_POLL_FREQUENCY_MS);

      cleanup = () => clearInterval(intervalHandle);
    }

    return cleanup;
  }, [isOpen, buttonNumber, setButtonNumber]);

  useEffect(() => {
    if (buttonNumber !== undefined) {
      setTimeout(() => {
        onButtonChange({
          __typename: "ControllerGamepadButton",
          buttonNumber: buttonNumber,
        });
      }, 600);
    }
  }, [buttonNumber, onButtonChange]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Press a Gamepad button</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center
            borderColor="purple.200"
            borderStyle="dashed"
            borderWidth="5px"
            w="100%"
            h="120px"
            borderRadius="4px"
          >
            <Text
              fontSize="2xl"
              color="purple.200"
              minWidth="50px"
              borderBottomWidth="2px"
              borderBottomColor="purple.200"
              textAlign="center"
            >
              {buttonNumber !== undefined ? (
                getGamepadButtonText(buttonNumber)
              ) : (
                <>&nbsp;</>
              )}
            </Text>
          </Center>
        </ModalBody>
        <ModalFooter>
          <UnsetButton onButtonChange={onButtonChange} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

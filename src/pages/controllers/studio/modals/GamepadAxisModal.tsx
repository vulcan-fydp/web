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
import { getGamepadAxisText } from "../utils/getGamepadAxisText";
import { AxisModalComponent, UnsetAxis } from "./AxisModal";

const GAMEPAD_AXIS_POLL_FREQUENCY_MS = 100;
const GAMEPAD_AXIS_EPSILON = 0.1;

function getFirstGamepadAxisMoved(): number | undefined {
  for (const gamepad of navigator.getGamepads()) {
    if (gamepad) {
      for (let i = 0; i < gamepad.axes.length; i++) {
        if (Math.abs(gamepad.axes[i]) > GAMEPAD_AXIS_EPSILON) {
          return i;
        }
      }
    }
  }
}

export const GamepadAxisModal: AxisModalComponent = ({
  isOpen,
  onAxisChange,
  onClose,
}) => {
  const [axisNumber, setAxisNumber] = useState<number>();

  useEffect(() => {
    setAxisNumber(undefined);
  }, [isOpen, setAxisNumber]);

  useEffect(() => {
    let cleanup = undefined;

    if (isOpen && axisNumber === undefined) {
      const intervalHandle = setInterval(() => {
        const axis = getFirstGamepadAxisMoved();
        if (axis !== undefined) {
          setAxisNumber(axis);
        }
      }, GAMEPAD_AXIS_POLL_FREQUENCY_MS);

      cleanup = () => clearInterval(intervalHandle);
    }

    return cleanup;
  }, [isOpen, axisNumber, setAxisNumber]);

  useEffect(() => {
    if (axisNumber !== undefined) {
      setTimeout(() => {
        onAxisChange({
          __typename: "ControllerGamepadAxis",
          axisNumber,
        });
      }, 600);
    }
  }, [axisNumber, onAxisChange]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Move a Gamepad stick</ModalHeader>
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
              {axisNumber !== undefined ? (
                getGamepadAxisText(axisNumber)
              ) : (
                <>&nbsp;</>
              )}
            </Text>
          </Center>
        </ModalBody>
        <ModalFooter>
          <UnsetAxis onAxisChange={onAxisChange} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

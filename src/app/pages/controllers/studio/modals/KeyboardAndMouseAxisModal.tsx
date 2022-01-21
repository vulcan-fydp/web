import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxisModalComponent } from "./AxisModal";
import { KeyboardAxisModal } from "./KeyboardAxisModal";
import { MouseAxisModal } from "./MouseAxisModal";

enum AxisType {
  KEYBOARD,
  MOUSE,
}

export const KeyboardAndMouseAxisModal: AxisModalComponent = ({
  isOpen,
  onAxisChange,
  onClose,
  axisNumber,
}) => {
  const [axisType, setAxisType] = useState<AxisType>();

  useEffect(() => {
    setAxisType(undefined);
  }, [isOpen, setAxisType]);

  return (
    <>
      <KeyboardAxisModal
        isOpen={isOpen && axisType === AxisType.KEYBOARD}
        onAxisChange={onAxisChange}
        onClose={onClose}
        axisNumber={axisNumber}
      />
      <MouseAxisModal
        isOpen={isOpen && axisType === AxisType.MOUSE}
        onAxisChange={onAxisChange}
        onClose={onClose}
        axisNumber={axisNumber}
      />
      <Modal isOpen={isOpen && axisType === undefined} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose an axis type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w="100%" h="120px" justifyContent="space-between">
              <Button
                borderColor="purple.200"
                borderStyle="dashed"
                borderWidth="5px"
                borderRadius="4px"
                h="100%"
                flex="1"
                variant="outline"
                marginRight="20px"
                onClick={() => setAxisType(AxisType.KEYBOARD)}
              >
                ⌨️ Keyboard
              </Button>
              <Button
                borderColor="purple.200"
                borderStyle="dashed"
                borderWidth="5px"
                borderRadius="4px"
                h="100%"
                flex="1"
                variant="outline"
                onClick={() => setAxisType(AxisType.MOUSE)}
              >
                🖱️ Mouse
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              w="100%"
              variant="solid"
              size="sm"
              onClick={() => onAxisChange(null)}
            >
              Unset Axis
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

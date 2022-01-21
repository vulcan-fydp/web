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
import { ButtonModalComponent, UnsetButton } from "./ButtonModal";
import { KeyboardButtonModal } from "./KeyboardButtonModal";
import { MouseButtonModal } from "./MouseButtonModal";

enum ButtonType {
  KEYBOARD,
  MOUSE,
}

export const KeyboardAndMouseButtonModal: ButtonModalComponent = ({
  isOpen,
  onButtonChange,
  onClose,
}) => {
  const [buttonType, setButtonType] = useState<ButtonType>();

  useEffect(() => {
    setButtonType(undefined);
  }, [isOpen, setButtonType]);

  return (
    <>
      <KeyboardButtonModal
        isOpen={isOpen && buttonType === ButtonType.KEYBOARD}
        onButtonChange={onButtonChange}
        onClose={onClose}
      />
      <MouseButtonModal
        isOpen={isOpen && buttonType === ButtonType.MOUSE}
        onButtonChange={onButtonChange}
        onClose={onClose}
      />
      <Modal isOpen={isOpen && buttonType === undefined} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose a button type</ModalHeader>
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
                onClick={() => setButtonType(ButtonType.KEYBOARD)}
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
                onClick={() => setButtonType(ButtonType.MOUSE)}
              >
                🖱️ Mouse
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <UnsetButton onButtonChange={onButtonChange} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

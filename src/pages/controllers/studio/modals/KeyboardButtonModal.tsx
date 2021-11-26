import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Text,
  Button,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ButtonModalComponent } from "./ButtonModal";

export const KeyboardButtonModal: ButtonModalComponent = ({
  isOpen,
  onButtonChange,
  onClose,
}) => {
  const [firstKeyDown, setFirstKeyDown] = useState<string>();

  // Todo: Esc and Enter are kinda broken
  // Consider implementing onEsc for the modal and changing the default focused
  // element to be the box
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen && firstKeyDown === undefined) {
        setFirstKeyDown(e.code);
        e.stopPropagation();
      }
    },
    [isOpen, firstKeyDown, setFirstKeyDown]
  );

  useEffect(() => {
    setFirstKeyDown(undefined);
  }, [isOpen, setFirstKeyDown]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    if (firstKeyDown !== undefined) {
      setTimeout(() => {
        onButtonChange({
          __typename: "ControllerKeyboardButton",
          keyCode: firstKeyDown,
        });
      }, 600);
    }
  }, [firstKeyDown, onButtonChange]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Press a Key</ModalHeader>
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
            >
              {firstKeyDown !== undefined ? firstKeyDown : <>&nbsp;</>}
            </Text>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button
            w="100%"
            variant="solid"
            size="sm"
            onClick={() => onButtonChange(null)}
          >
            Unset Button
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

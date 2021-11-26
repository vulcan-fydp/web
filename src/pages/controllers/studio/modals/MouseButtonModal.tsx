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
import { disableContextMenu } from "lib/disableContextMenu";
import { useCallback, useEffect, useState } from "react";
import { getMouseButtonText } from "../utils/getMouseButtonText";
import { ButtonModalComponent } from "./ButtonModal";

// @todo: Buttons 3 and 4 are kind of tricky because they cause navigation and cannot be explicitly
// prevented. Check out https://pretagteam.com/question/preventing-mouse-fourth-and-fifth-buttons-from-navigating-backforward-in-browsers-history
// for a potential solution

export const MouseButtonModal: ButtonModalComponent = ({
  isOpen,
  onButtonChange,
  onClose,
}) => {
  const [firstButtonDown, setFirstButtonDown] = useState<number>();

  // Todo: Esc and Enter are kinda broken
  // Consider implementing onEsc for the modal and changing the default focused
  // element to be the box
  const onMouseButtonClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isOpen && firstButtonDown === undefined) {
        setFirstButtonDown(e.button);
        e.stopPropagation();
      }
    },
    [isOpen, firstButtonDown, setFirstButtonDown]
  );

  useEffect(() => {
    setFirstButtonDown(undefined);
  }, [isOpen, setFirstButtonDown]);

  useEffect(() => {
    if (firstButtonDown !== undefined) {
      setTimeout(() => {
        onButtonChange({
          __typename: "ControllerMouseButton",
          buttonNumber: firstButtonDown,
        });
      }, 600);
    }
  }, [firstButtonDown, onButtonChange]);

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
            cursor="pointer"
            onMouseUp={onMouseButtonClick}
            onContextMenu={disableContextMenu}
          >
            <Text
              fontSize="2xl"
              color="purple.200"
              minWidth="50px"
              borderBottomWidth="2px"
              borderBottomColor="purple.200"
            >
              {firstButtonDown !== undefined
                ? getMouseButtonText(firstButtonDown)
                : "Click here"}
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

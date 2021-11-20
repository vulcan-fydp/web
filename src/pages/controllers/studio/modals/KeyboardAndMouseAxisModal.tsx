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
  HStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { AxisModalComponent } from "./AxisModal";

export const KeyboardAndMouseAxisModal: AxisModalComponent = ({
  isOpen,
  onAxisChange,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose an axis type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack
              borderColor="purple.200"
              borderStyle="dashed"
              borderWidth="5px"
              w="100%"
              h="120px"
              borderRadius="4px"
            >
              <Button>Keyboard</Button>
              <Button>Mouse</Button>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button w="100%" variant="solid" size="sm">
              Unset Button
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

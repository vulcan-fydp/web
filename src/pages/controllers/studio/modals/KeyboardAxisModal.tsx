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

export const KeyboardAxisModal: AxisModalComponent = ({
  isOpen,
  onAxisChange,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Press a Key</ModalHeader>
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
            <Text
              fontSize="2xl"
              color="purple.200"
              minWidth="50px"
              borderBottomWidth="2px"
              borderBottomColor="purple.200"
            >
              {/* {firstKeyDown !== undefined ? firstKeyDown : <>&nbsp;</>} */}
            </Text>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button w="100%" variant="solid" size="sm">
            Unset Button
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

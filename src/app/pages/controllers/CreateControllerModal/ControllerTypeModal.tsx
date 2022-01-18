import { Button } from "@chakra-ui/button";
import { Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useMemo } from "react";
import {
  ControllerType,
  CONTROLLER_TYPE_DISPLAY_ORDER,
  getControllerTypeName,
} from "../studio/enums/controller-type";

export const CONTROLLER_TYPE_QUERY_PARAM = "controller_type";

interface ControllerTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  setControllerType: (ct: ControllerType) => void;
}

export const ControllerTypeModal: React.FC<ControllerTypeModalProps> = ({
  isOpen,
  onClose,
  setControllerType,
}) => {
  const controllerTypeButtons = useMemo(
    () =>
      CONTROLLER_TYPE_DISPLAY_ORDER.map((controllerType) => (
        <Button
          key={controllerType}
          w="100%"
          onClick={() => setControllerType(controllerType)}
        >
          {getControllerTypeName(controllerType)}
        </Button>
      )),
    [setControllerType]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Controller Type</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Text>How do you want to control this controller?</Text>
          <VStack mt="20px">{controllerTypeButtons}</VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

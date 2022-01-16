import { TriangleUpIcon } from "@chakra-ui/icons";
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
  chakra,
  Box,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { thickDashedBorder } from "styles/thickDashedBorder";
import {
  getRotationForNegativeAxis,
  getRotationForPositiveAxis,
} from "../utils/getRotationForAxis";
import { AxisModalComponent } from "./AxisModal";

const PLACEHOLDER = <>&nbsp;</>;

export const KeyboardAxisModal: AxisModalComponent = ({
  isOpen,
  onAxisChange,
  onClose,
  axisNumber,
}) => {
  const [negativeKeyCode, setNegativeKeyCode] = useState<string>();
  const [positiveKeyCode, setPositiveKeyCode] = useState<string>();
  const [visibleText, setVisibleText] = useState<React.ReactNode>(PLACEHOLDER);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen) {
        if (negativeKeyCode === undefined) {
          setNegativeKeyCode(e.code);
          e.stopPropagation();
        } else if (positiveKeyCode === undefined) {
          setPositiveKeyCode(e.code);
          e.stopPropagation();
        }
      }
    },
    [
      isOpen,
      negativeKeyCode,
      setNegativeKeyCode,
      positiveKeyCode,
      setPositiveKeyCode,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    if (negativeKeyCode !== undefined && positiveKeyCode === undefined) {
      setVisibleText(negativeKeyCode);
      setTimeout(() => {
        setVisibleText(PLACEHOLDER);
      }, 600);
    } else if (negativeKeyCode !== undefined && positiveKeyCode !== undefined) {
      setVisibleText(positiveKeyCode);
      setTimeout(() => {
        onAxisChange({
          __typename: "ControllerKeyboardAxis",
          negativeKeyCode,
          positiveKeyCode,
        });
      }, 600);
    }
  }, [negativeKeyCode, positiveKeyCode, onAxisChange]);

  useEffect(() => {
    setNegativeKeyCode(undefined);
    setPositiveKeyCode(undefined);
    setVisibleText(PLACEHOLDER);
  }, [isOpen, setNegativeKeyCode, setPositiveKeyCode, setVisibleText]);

  const rotation =
    negativeKeyCode === undefined || negativeKeyCode === visibleText
      ? getRotationForNegativeAxis(axisNumber)
      : getRotationForPositiveAxis(axisNumber);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Press a Key</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack w="100%" h="120px" alignItems="stretch">
            <Center flex="1">
              <Center
                width="80px"
                height="80px"
                backgroundColor="brightPurple.400"
                borderColor="purple.200"
                borderWidth="3px"
                borderRadius="50%"
              >
                <Center
                  width="64px"
                  height="64px"
                  backgroundColor="brightPurple.400"
                  borderColor="purple.200"
                  borderWidth="3px"
                  borderRadius="50%"
                  transform={`rotate(${rotation}deg)`}
                  transition="transform 0.4s ease-in-out"
                >
                  <TriangleUpIcon position="relative" top="-20px" />
                </Center>
              </Center>
            </Center>
            <Box {...thickDashedBorder} flex="3">
              <Center height="100%">
                <Text
                  fontSize="2xl"
                  color="purple.200"
                  minWidth="50px"
                  borderBottomWidth="2px"
                  borderBottomColor="purple.200"
                >
                  {visibleText}
                </Text>
              </Center>
            </Box>
          </HStack>
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
  );
};

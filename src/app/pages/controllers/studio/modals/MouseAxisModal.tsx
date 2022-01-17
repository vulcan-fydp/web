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
import { Axis, ControllerMouseAxis } from "app/backend-types";
import { useCallback, useEffect, useState } from "react";
import { thickDashedBorder } from "styles/thickDashedBorder";
import {
  getRotationForNegativeAxis,
  getRotationForPositiveAxis,
} from "../utils/getRotationForAxis";
import { AxisModalComponent } from "./AxisModal";

const CIRCLE_RADIUS = 10;
const ARROW_LENGTH = 40;

const Arrow: React.FC<{
  rotation: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isMouseOver: boolean;
  isClicked: boolean;
}> = ({
  rotation,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isMouseOver,
  isClicked,
}) => {
  const color = isMouseOver || isClicked ? "purple.200" : "purple.400";

  return (
    <Box transform={`rotate(${rotation}deg)`}>
      <Box
        position="absolute"
        left="-1px"
        right="-1px"
        bottom={`${CIRCLE_RADIUS}px`}
        top={`-${CIRCLE_RADIUS + ARROW_LENGTH}px`}
        backgroundColor={color}
      ></Box>
      <Box
        position="absolute"
        top={`-${CIRCLE_RADIUS + ARROW_LENGTH}px`}
        bottom={`${CIRCLE_RADIUS + ARROW_LENGTH}px`}
        left="0px"
        right="0px"
      >
        <Box position="absolute" transform="rotate(30deg)">
          <Box
            position="absolute"
            bottom="-10px"
            top="0px"
            left="-1px"
            right="-1px"
            backgroundColor={color}
          ></Box>
        </Box>

        <Box position="absolute" transform="rotate(-30deg)">
          <Box
            position="absolute"
            bottom="-10px"
            top="0px"
            left="-1px"
            right="-1px"
            backgroundColor={color}
          ></Box>
        </Box>
      </Box>
      <Box
        position="absolute"
        left="-10px"
        right="-10px"
        bottom={`${CIRCLE_RADIUS}px`}
        top={`-${CIRCLE_RADIUS + ARROW_LENGTH}px`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor="pointer"
      />
    </Box>
  );
};

export const MouseAxisModal: AxisModalComponent = ({
  isOpen,
  onAxisChange,
  onClose,
  axisNumber,
}) => {
  const [axisDirection, setAxisDirection] = useState<Axis>();
  const [mouseOverDirection, setMouseOverDirection] = useState<Axis>();

  useEffect(() => {
    if (axisDirection !== undefined) {
      setTimeout(() => {
        onAxisChange({
          __typename: "ControllerMouseAxis",
          axis: axisDirection,
        });
      }, 600);
    }
  }, [axisDirection, onAxisChange]);

  useEffect(() => {
    setAxisDirection(undefined);
  }, [isOpen, setAxisDirection]);

  const onHorizontalMouseEnter = useCallback(() => {
    setMouseOverDirection(Axis.Horizontal);
  }, [setMouseOverDirection]);

  const onHorizontalClick = useCallback(() => {
    setAxisDirection((axis) => axis ?? Axis.Horizontal);
  }, [setAxisDirection]);

  const onVerticalClick = useCallback(() => {
    setAxisDirection((axis) => axis ?? Axis.Vertical);
  }, [setAxisDirection]);

  const onVerticalMouseEnter = useCallback(() => {
    setMouseOverDirection(Axis.Vertical);
  }, [setMouseOverDirection]);

  const onMouseLeave = useCallback(() => {
    setMouseOverDirection(undefined);
  }, [setMouseOverDirection]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose a mouse axis</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box {...thickDashedBorder} height="200px" position="relative">
            <Box
              position="absolute"
              top="50%"
              right="50%"
              bottom="50%"
              left="50%"
            >
              <Box
                position="absolute"
                left={`-${CIRCLE_RADIUS}px`}
                right={`-${CIRCLE_RADIUS}px`}
                top={`-${CIRCLE_RADIUS}px`}
                bottom={`-${CIRCLE_RADIUS}px`}
                backgroundColor="purple.200"
                borderRadius="50%"
              />
              <Arrow
                rotation={0}
                onClick={onVerticalClick}
                onMouseEnter={onVerticalMouseEnter}
                onMouseLeave={onMouseLeave}
                isMouseOver={mouseOverDirection === Axis.Vertical}
                isClicked={axisDirection === Axis.Vertical}
              />
              <Arrow
                rotation={90}
                onClick={onHorizontalClick}
                onMouseEnter={onHorizontalMouseEnter}
                onMouseLeave={onMouseLeave}
                isMouseOver={mouseOverDirection === Axis.Horizontal}
                isClicked={axisDirection === Axis.Horizontal}
              />
              <Arrow
                rotation={180}
                onClick={onVerticalClick}
                onMouseEnter={onVerticalMouseEnter}
                onMouseLeave={onMouseLeave}
                isMouseOver={mouseOverDirection === Axis.Vertical}
                isClicked={axisDirection === Axis.Vertical}
              />
              <Arrow
                rotation={270}
                onClick={onHorizontalClick}
                onMouseEnter={onHorizontalMouseEnter}
                onMouseLeave={onMouseLeave}
                isMouseOver={mouseOverDirection === Axis.Horizontal}
                isClicked={axisDirection === Axis.Horizontal}
              />
            </Box>
          </Box>
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

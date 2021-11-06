import { Box, Button } from "@chakra-ui/react";
import { getNonInteractiveButtonProps } from "lib/getNonInteractiveButtonProps";
import { useCallback } from "react";

export const Anchor: React.FC<{ x: number; y: number }> = ({
  children,
  x,
  y,
}) => {
  return (
    <Box
      position="absolute"
      w="0"
      h="0"
      overflow="visible"
      top={-y + "px"}
      left={x + "px"}
    >
      {children}
    </Box>
  );
};

export interface LayoutInputProps {
  buttons: string[];
  axes: string[];
  onButtonClick: (buttonNumber: number) => void;
  onAxisClick: (axisNumber: number) => void;
  isReadOnly: boolean;
}

export type LayoutInputComponent = React.FC<LayoutInputProps>;

export const useLayoutInputCallback = (
  inputNumber: number,
  rawCallback: (inputNumber: number) => void
) => {
  const callback = useCallback(() => {
    rawCallback(inputNumber);
  }, [inputNumber, rawCallback]);

  return callback;
};

interface LayoutInputButtonProps {
  children: string;
  isReadOnly?: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  onClick: () => void;
}

export const LayoutInputButton: React.FC<LayoutInputButtonProps> = ({
  isReadOnly,
  children,
  onClick,
  ...layoutProps
}) => {
  return (
    <Button
      onClick={onClick}
      position="absolute"
      variant="outline"
      size="sm"
      {...layoutProps}
      // By setting isDisabled={true} the button will appear dimmed
      // We do not want that so instead we make the button impossible to click
      {...getNonInteractiveButtonProps(isReadOnly)}
    >
      {children}
    </Button>
  );
};

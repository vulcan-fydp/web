import { ControllerButton } from "app/backend-types";
import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

interface ButtonModalProps {
  isOpen: boolean;
  onButtonChange: (x: ControllerButton | null) => void;
  onClose: () => void;
}

export type ButtonModalComponent = React.FC<ButtonModalProps>;

interface UnsetButtonProps {
  onButtonChange: (button: ControllerButton | null) => void;
}

export const UnsetButton: React.FC<UnsetButtonProps> = ({ onButtonChange }) => {
  const onClick = useCallback(() => {
    onButtonChange(null);
  }, [onButtonChange]);

  return (
    <Button w="100%" variant="solid" size="sm" onClick={onClick}>
      Unset Button
    </Button>
  );
};

import { Button } from "@chakra-ui/react";
import { ControllerAxis } from "backend-types";
import { useCallback } from "react";

interface AxisModalProps {
  isOpen: boolean;
  onAxisChange: (x: ControllerAxis | null) => void;
  onClose: () => void;
  axisNumber: number;
}

export type AxisModalComponent = React.FC<AxisModalProps>;

interface UnsetButtonProps {
  onAxisChange: (axis: ControllerAxis | null) => void;
}

export const UnsetAxis: React.FC<UnsetButtonProps> = ({ onAxisChange }) => {
  const onClick = useCallback(() => {
    onAxisChange(null);
  }, [onAxisChange]);

  return (
    <Button w="100%" variant="solid" size="sm" onClick={onClick}>
      Unset Axis
    </Button>
  );
};

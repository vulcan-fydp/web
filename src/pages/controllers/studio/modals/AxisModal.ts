import { ControllerAxis } from "backend-types";

interface AxisModalProps {
  isOpen: boolean;
  onAxisChange: (x: ControllerAxis | null) => void;
  onClose: () => void;
  axisNumber: number;
}

export type AxisModalComponent = React.FC<AxisModalProps>;

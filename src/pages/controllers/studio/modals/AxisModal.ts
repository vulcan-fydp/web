import { ControllerAxis } from "backend-types";

interface AxisModalProps {
  isOpen: boolean;
  onAxisChange: (x: ControllerAxis | null) => void;
  onClose: () => void;
}

export type AxisModalComponent = React.FC<AxisModalProps>;

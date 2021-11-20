import { ControllerButton } from "backend-types";

interface ButtonModalProps {
  isOpen: boolean;
  onButtonChange: (x: ControllerButton | null) => void;
  onClose: () => void;
}

export type ButtonModalComponent = React.FC<ButtonModalProps>;

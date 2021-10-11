export enum ControllerType {
  TOUCH = "TOUCH",
  KEYBOARD_AND_MOUSE = "KEYBOARD_AND_MOUSE",
  GAMEPAD = "GAMEPAD",
}

export function getControllerTypeName(controllerType: ControllerType): string {
  switch (controllerType) {
    case ControllerType.TOUCH:
      return "Touch";
    case ControllerType.KEYBOARD_AND_MOUSE:
      return "Keyboard and Mouse";
    case ControllerType.GAMEPAD:
      return "Gamepad";
  }
}

export const CONTROLLER_TYPE_DISPLAY_ORDER = [
  ControllerType.KEYBOARD_AND_MOUSE,
  ControllerType.GAMEPAD,
  ControllerType.TOUCH,
];

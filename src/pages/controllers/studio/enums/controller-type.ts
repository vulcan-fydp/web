export enum ControllerType {
  TOUCH = "TOUCH",
  KEYBOARD_AND_MOUSE = "KEYBOARD_AND_MOUSE",
  GAMEPAD = "GAMEPAD",
  MIXED = "MIXED",
  EMPTY = "EMPTY",
}

export function getControllerTypeName(controllerType: ControllerType): string {
  switch (controllerType) {
    case ControllerType.TOUCH:
      return "Touch";
    case ControllerType.KEYBOARD_AND_MOUSE:
      return "Keyboard and Mouse";
    case ControllerType.GAMEPAD:
      return "Gamepad";
    case ControllerType.EMPTY:
    case ControllerType.MIXED:
      throw new Error("Cannot get controller type name for mixed controller");
  }
}

/**
 * Pseudo controller types do not correspond to physical controller types and are
 * not supported by the studio
 */
export function isPseudoControllerType(
  controllerType: ControllerType
): boolean {
  switch (controllerType) {
    case ControllerType.EMPTY:
      return true;
    case ControllerType.GAMEPAD:
      return false;
    case ControllerType.KEYBOARD_AND_MOUSE:
      return false;
    case ControllerType.MIXED:
      return true;
    case ControllerType.TOUCH:
      return false;
  }
}

export const CONTROLLER_TYPE_DISPLAY_ORDER = [
  ControllerType.KEYBOARD_AND_MOUSE,
  ControllerType.GAMEPAD,
  ControllerType.TOUCH,
];

export const INITIAL_CONTROLLER_TYPE = ControllerType.KEYBOARD_AND_MOUSE;

export const isTouchEnabledDevice = "ontouchstart" in window;
export const isKeyboardEnabledDevice = true;
export const isMouseEnabledDevice = true;
export const isGamepadEnabledDevice = navigator.getGamepads().some((_) => !!_);

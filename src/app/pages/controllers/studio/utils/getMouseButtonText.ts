export function getMouseButtonText(buttonNumber: number): string {
  switch (buttonNumber) {
    case 0:
      return "Left mouse";
    case 1:
      return "Middle mouse";
    case 2:
      return "Right mouse";
    case 3:
      return "Back mouse";
    case 4:
      return "Forward mouse";
    default:
      return `Mouse ${buttonNumber + 1}`;
  }
}

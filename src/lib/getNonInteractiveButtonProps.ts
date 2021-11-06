const nonInteractiveButtonProps = {
  pointerEvents: "none",
  tabIndex: -1,
} as const;

const interactiveButtonProps = {} as const;

export function getNonInteractiveButtonProps(
  isNonInteractive?: boolean
): typeof nonInteractiveButtonProps | typeof interactiveButtonProps {
  return isNonInteractive ? nonInteractiveButtonProps : interactiveButtonProps;
}

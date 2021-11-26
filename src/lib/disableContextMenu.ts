/**
 * Disables the context menu (menu that appears when you right click)
 */
export const disableContextMenu: React.MouseEventHandler<HTMLElement> = (
  event
) => {
  event.stopPropagation();
  event.preventDefault();

  return false;
};

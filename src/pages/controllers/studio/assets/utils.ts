type Placement = "left" | "right" | "bottom" | "top";

type PreferredPlacements = [Placement, Placement, Placement, Placement];

function circularOrigin(
  cx: number,
  cy: number,
  r: number,
  preferredPlacements: PreferredPlacements
) {}

function pointOrigin(
  x: number,
  y: number,
  preferredPlacements: PreferredPlacements
) {}

export function getControllerOriginUtils(
  width: number,
  height: number
): {
  circularOrigin: typeof circularOrigin;
  pointOrigin: typeof pointOrigin;
} {
  return {
    circularOrigin: (cx, cy, r, p) =>
      circularOrigin(cx / width, cy / width, r / width, p),
    pointOrigin: (x, y, p) => pointOrigin(x / width, y / width, p),
  };
}

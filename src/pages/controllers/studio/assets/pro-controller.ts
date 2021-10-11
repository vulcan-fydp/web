import { getControllerOriginUtils } from "./utils";

const { circularOrigin, pointOrigin } = getControllerOriginUtils(2560, 1783);

// See https://docs.google.com/document/d/135Vo00U6QaiPMNFLNM3aPdHtFTBMuVk3WaypAi8aGoY/edit
export const SwitchControllerOrigins = {
  buttons: [
    circularOrigin(2160, 542, 62, ["right", "bottom", "top", "left"]),
    circularOrigin(1956, 711, 70, ["right", "bottom", "top", "left"]),
    circularOrigin(1954, 364, 70, ["right", "bottom", "top", "left"]),
    circularOrigin(1754, 542, 70, ["right", "bottom", "top", "left"]),
  ],
  axes: [],
};

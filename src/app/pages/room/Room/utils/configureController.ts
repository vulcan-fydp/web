import {
  Controller as BackendController,
  ControllerButton as BackendControllerButton,
  ControllerAxis as BackendControllerAxis,
  ControllerTouchAnchor as BackendControllerTouchAnchor,
  Axis as BackendAxis,
  Maybe,
} from "app/backend-types";
import {
  Axis,
  Controller,
  ControllerButton,
  ControllerAxis,
  ControllerTouchAnchor,
} from "controller-input";

const axisLookup = {
  [BackendAxis.Horizontal]: Axis.HORIZONTAL,
  [BackendAxis.Vertical]: Axis.VERTICAL,
};

const anchorLookup = {
  [BackendControllerTouchAnchor.BottomLeft]: ControllerTouchAnchor.BOTTOM_LEFT,
  [BackendControllerTouchAnchor.BottomRight]:
    ControllerTouchAnchor.BOTTOM_RIGHT,
};

export function configureController(controller: BackendController): Controller {
  return {
    buttons: configureControllerButtons(controller.buttons),
    axes: configureControllerAxes(controller.axes),
  };
}

function configureControllerButtons(
  controllerButtons: Maybe<BackendControllerButton>[]
): Controller["buttons"] {
  return [
    configureControllerButton(controllerButtons[0]),
    configureControllerButton(controllerButtons[1]),
    configureControllerButton(controllerButtons[2]),
    configureControllerButton(controllerButtons[3]),
    configureControllerButton(controllerButtons[4]),
    configureControllerButton(controllerButtons[5]),
    configureControllerButton(controllerButtons[6]),
    configureControllerButton(controllerButtons[7]),
    configureControllerButton(controllerButtons[8]),
    configureControllerButton(controllerButtons[9]),
    configureControllerButton(controllerButtons[10]),
    configureControllerButton(controllerButtons[11]),
    configureControllerButton(controllerButtons[12]),
    configureControllerButton(controllerButtons[13]),
    configureControllerButton(controllerButtons[14]),
    configureControllerButton(controllerButtons[15]),
    configureControllerButton(controllerButtons[16]),
  ];
}

function configureControllerButton(
  controllerButton: Maybe<BackendControllerButton>
): ControllerButton {
  switch (controllerButton?.__typename) {
    case "ControllerGamepadButton":
      return {
        __typename: "ControllerGamepadButton",
        buttonNumber: controllerButton.buttonNumber,
        gamepadNumber: 0, // todo: fixme
      };
    case "ControllerKeyboardButton":
      return {
        __typename: "ControllerKeyboardButton",
        keyCode: controllerButton.keyCode,
      };
    case "ControllerMouseButton":
      return {
        __typename: "ControllerMouseButton",
        buttonNumber: controllerButton.buttonNumber,
      };
    case "ControllerTouchButton":
      return {
        __typename: "ControllerTouchButton",
        anchor: anchorLookup[controllerButton.anchor],
        radius: 50, // todo: unhardcode
        xOffset: controllerButton.xOffset,
        yOffset: controllerButton.yOffset,
      };
  }

  return null;
}

function configureControllerAxes(
  controllerAxes: Maybe<BackendControllerAxis>[]
): Controller["axes"] {
  return [
    configureControllerAxis(controllerAxes[0]),
    configureControllerAxis(controllerAxes[1]),
    configureControllerAxis(controllerAxes[2]),
    configureControllerAxis(controllerAxes[3]),
  ];
}

function configureControllerAxis(
  controllerAxis: Maybe<BackendControllerAxis>
): ControllerAxis {
  switch (controllerAxis?.__typename) {
    case "ControllerDragAxis":
      return {
        __typename: "ControllerDragAxis",
        axis: axisLookup[controllerAxis.axis],
      };
    case "ControllerGamepadAxis":
      return {
        __typename: "ControllerGamepadAxis",
        axisNumber: controllerAxis.axisNumber,
        controllerNumber: 0, // todo: not hardcode
      };
    case "ControllerKeyboardAxis":
      return {
        __typename: "ControllerKeyboardAxis",
        negativeKeyCode: controllerAxis.negativeKeyCode,
        positiveKeyCode: controllerAxis.positiveKeyCode,
      };
    case "ControllerMouseAxis":
      return {
        __typename: "ControllerMouseAxis",
        axis: axisLookup[controllerAxis.axis],
      };
    case "ControllerTouchJoystickAxis":
      return {
        __typename: "ControllerTouchJoystickAxis",
        anchor: ControllerTouchAnchor.BOTTOM_LEFT,
        axis: axisLookup[BackendAxis.Horizontal], // todo: Not hardcode
        radius: controllerAxis.radius,
        xOffset: controllerAxis.xOffset,
        yOffset: controllerAxis.yOffset,
      };
  }

  return null;
}

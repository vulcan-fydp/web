import { ControllerState } from "controller-input/build/state";

function booleansToNumber(...bools: (boolean | null | undefined)[]) {
  let n = 0;
  bools.forEach((b, i) => (n |= b ? 1 << i : 0));
  return n;
}

function unitDoubleToUint16(double: number) {
  return (double + 1) * 32767;
}

export function controllerStateToArrayBuffer(
  id: number,
  sequence: number,
  controller: ControllerState
): ArrayBuffer {
  const buffer = new ArrayBuffer(13);
  const dataView = new DataView(buffer);

  dataView.setUint8(0, id);

  dataView.setUint8(1, sequence);

  dataView.setUint8(
    2,
    booleansToNumber(
      ...controller.buttons.slice(0, 8).map((button) => button.pressed)
    )
  );

  dataView.setUint8(
    3,
    booleansToNumber(
      ...controller.buttons.slice(8, 16).map((button) => button.pressed)
    )
  );

  dataView.setUint8(4, booleansToNumber(controller.buttons[16].pressed));

  // @todo: Find root cause of why this is necessary
  dataView.setUint16(5, unitDoubleToUint16(controller.axes[0].value));
  dataView.setUint16(7, unitDoubleToUint16(-controller.axes[1].value));
  dataView.setUint16(9, unitDoubleToUint16(controller.axes[2].value));
  dataView.setUint16(11, unitDoubleToUint16(-controller.axes[3].value));

  return buffer;
}

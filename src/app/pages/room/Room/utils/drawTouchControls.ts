import { Controller, ControllerTouchAnchor } from "app/backend-types";

export function drawTouchControls(
  canvas: HTMLCanvasElement,
  controller: Controller
) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const button of controller.buttons) {
    if (button?.__typename === "ControllerTouchButton") {
      drawCircle(ctx, button.anchor, button.xOffset, button.yOffset, 50);
    }
  }

  for (const axis of controller.axes) {
    if (axis?.__typename === "ControllerTouchJoystickAxis") {
      drawCircle(ctx, axis.anchor, axis.xOffset, axis.yOffset, axis.radius);
    }
  }
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  anchor: ControllerTouchAnchor,
  rx: number,
  ry: number,
  radius: number
) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  let x: number;
  if (anchor === ControllerTouchAnchor.BottomLeft) {
    x = rx;
  } else {
    x = w - rx;
  }

  const y = h - ry;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 3.14159 * 2);
  ctx.stroke();
}

export function getRotationForNegativeAxis(axisNumber: number): number {
  if (axisNumber % 2 === 0) {
    return 270;
  } else {
    return 0;
  }
}

export function getRotationForPositiveAxis(axisNumber: number): number {
  if (axisNumber % 2 === 0) {
    return 90;
  } else {
    return 180;
  }
}

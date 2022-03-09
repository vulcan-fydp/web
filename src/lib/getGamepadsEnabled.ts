// Firefox has a dynamically sized array so instead we always use a
// fixed size for consistent behaviour across browsers.
export const NUM_GAMEPADS = 4;

export function getGamepadsEnabled(): boolean[] {
  const gamepadsEnabled = [];

  for (let i = 0; i < NUM_GAMEPADS; i++) {
    gamepadsEnabled[i] = !!navigator.getGamepads()[i];
  }

  return gamepadsEnabled;
}

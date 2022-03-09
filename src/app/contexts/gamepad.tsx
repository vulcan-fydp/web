import { getGamepadsEnabled, NUM_GAMEPADS } from "lib/getGamepadsEnabled";
import React, { useContext, useEffect, useState } from "react";

const GamepadContext = React.createContext(0);

export const GamepadProvider = React.memo(({ children }) => {
  const [gamepadsState, setGamepadsState] = useState({
    counter: 1,
    gamepadsEnabled: getGamepadsEnabled(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const gamepads = navigator.getGamepads();

      setGamepadsState((prevGamepadsState) => {
        const { counter, gamepadsEnabled: prevGamepadsEnabled } =
          prevGamepadsState;

        for (let i = 0; i < NUM_GAMEPADS; i++) {
          if (!!gamepads[i] !== prevGamepadsEnabled[i]) {
            return {
              counter: counter + 1,
              gamepadsEnabled: getGamepadsEnabled(),
            };
          }
        }

        return prevGamepadsState;
      });
    }, 200);

    return () => clearTimeout(interval);
  }, [setGamepadsState]);

  return (
    <GamepadContext.Provider value={gamepadsState.counter}>
      {children}
    </GamepadContext.Provider>
  );
});

/**
 * A hook that should be used to determine if gamepads have been connected
 * or disconnected this update.
 *
 * The return type should be treated as opaque and should only be used
 * in the dependency array of hooks to cause them to update.
 *
 * ```
 * const gamepadUpdateTrigger = useGamepadUpdateTrigger();
 *
 * useEffect(() => {
 *   console.log("Some gamepad state changed! We don't know what though.");
 * }, [gamepadUpdateTrigger]);
 * ```
 *
 * Motivation:
 * I've (@MJez29) seen before where wrappers on browser apis get out of sync with
 * the apis themselves and can cause unexpected states. To avoid this I'm trying
 * out a "trigger" pattern where the global state detects when there are changes
 * to `navigator.getGamepads()` and changes the value of the trigger variable. It
 * is up to consumers to pull the state directly from the browser rather than being
 * passed potentially stale state by the hook.
 */
export const useGamepadUpdateTrigger = () => useContext(GamepadContext);

import { useToast } from "@chakra-ui/react";
import { useGamepadUpdateTrigger } from "app/contexts/gamepad";
import { getGamepadsEnabled, NUM_GAMEPADS } from "lib/getGamepadsEnabled";
import { useEffect, useRef } from "react";

export const GamepadToasts: React.FC = () => {
  const showToast = useToast();

  const prevGamepadsEnabledRef = useRef(getGamepadsEnabled());

  const gamepadUpdateTrigger = useGamepadUpdateTrigger();

  useEffect(() => {
    const gamepadsEnabled = getGamepadsEnabled();

    for (let i = 0; i < NUM_GAMEPADS; i++) {
      if (gamepadsEnabled[i] && !prevGamepadsEnabledRef.current[i]) {
        showToast({
          title: `Gamepad ${i + 1} connected`,
          status: "info",
          position: "top",
        });
      } else if (!gamepadsEnabled[i] && prevGamepadsEnabledRef.current[i]) {
        showToast({
          title: `Gamepad ${i + 1} disconnected`,
          status: "warning",
          position: "top",
        });
      }
    }

    prevGamepadsEnabledRef.current = gamepadsEnabled;
  }, [gamepadUpdateTrigger, prevGamepadsEnabledRef, showToast]);

  return null;
};

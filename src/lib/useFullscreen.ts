import { useState, useCallback } from "react";
import screenfull from "screenfull";

type FullscreenAPI = {
  isFullscreen: boolean;
  toggleFullscreen: () => Promise<void>;
};

export const useFullscreen = (
  containerRef: React.MutableRefObject<null>
): FullscreenAPI => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  document.onfullscreenchange = () => {
    setIsFullscreen(Boolean(document.fullscreenElement));
  };

  const toggleFullscreen = useCallback(async () => {
    if (containerRef.current) {
      await screenfull.toggle(containerRef.current!);
    }
  }, [containerRef]);

  return {
    isFullscreen,
    toggleFullscreen,
  };
};

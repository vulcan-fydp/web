import { useState, useCallback, useEffect } from "react";
import screenfull from "screenfull";

type FullscreenAPI = {
  isFullscreen: boolean;
  toggleFullscreen: () => Promise<void>;
};

export const useFullscreen = (
  containerRef: React.MutableRefObject<null>
): FullscreenAPI => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const cb = () => setIsFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener("fullscreenchange", cb);
    return () => window.removeEventListener("fullscreenchange", cb);
  }, [setIsFullscreen]);

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

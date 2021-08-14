import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = (callback: () => void) => {
  const frameRef = useRef<number>();

  const animate = useCallback(() => {
    frameRef.current = requestAnimationFrame(() => {
      callback();
      animate();
    });
  }, [callback]);

  useEffect(() => {
    animate();

    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate, frameRef]);
};

import { useRef, useCallback } from "react";

/**
 * useSwipe(onSwipe, options)
 *
 * onSwipe(direction) is called with 'up' | 'down' | 'left' | 'right'
 *
 * options:
 *   - threshold: minimum px distance to consider a swipe (default 20)
 *   - enableMouse: boolean to enable mouse dragging (default false)
 *
 * Returns an object with handlers you can spread onto an element:
 *   {...swipeHandlers} => { onTouchStart, onTouchEnd, onMouseDown, onMouseUp }
 *
 * Example:
 *   const swipe = useSwipe(dir => console.log(dir));
 *   <div {...swipe}>...</div>
 */
export default function useSwipe(onSwipe, options = {}) {
  const { threshold = 20, enableMouse = false } = options;
  const startRef = useRef(null);
  const isMouseDownRef = useRef(false);

  const _getDirection = (dx, dy, thresh) => {
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (Math.max(absX, absY) < thresh) return null;
    return absX > absY ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
  };

  // Touch handlers
  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    if (!t) return;
    startRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      const t = e.changedTouches[0];
      if (!t || !startRef.current) {
        startRef.current = null;
        return;
      }
      const dx = t.clientX - startRef.current.x;
      const dy = t.clientY - startRef.current.y;
      const dir = _getDirection(dx, dy, threshold);
      if (dir && typeof onSwipe === "function") onSwipe(dir);
      startRef.current = null;
    },
    [onSwipe, threshold]
  );

  // Optional mouse handlers for desktop drag support
  const onMouseDown = useCallback(
    (e) => {
      if (!enableMouse) return;
      isMouseDownRef.current = true;
      startRef.current = { x: e.clientX, y: e.clientY };
    },
    [enableMouse]
  );

  const onMouseUp = useCallback(
    (e) => {
      if (!enableMouse) return;
      if (!isMouseDownRef.current || !startRef.current) {
        isMouseDownRef.current = false;
        startRef.current = null;
        return;
      }
      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;
      const dir = _getDirection(dx, dy, threshold);
      if (dir && typeof onSwipe === "function") onSwipe(dir);
      isMouseDownRef.current = false;
      startRef.current = null;
    },
    [onSwipe, threshold, enableMouse]
  );

  // Return handlers to attach to an element
  return {
    onTouchStart,
    onTouchEnd,
    ...(enableMouse ? { onMouseDown, onMouseUp } : {}),
  };
}

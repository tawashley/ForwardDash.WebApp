import { useEffect, useRef } from 'react';

/**
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(callback: () => void, delayMs: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
        if(savedCallback.current) {
            savedCallback.current();
        }
    }

    if (delayMs !== null) {
      let id = setInterval(tick, delayMs);
      return () => clearInterval(id);
    }
  }, [delayMs]);
}

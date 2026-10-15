import { useState, useEffect } from 'react';

export function useCountUp(target: number = 20, durationMs: number = 2000, startDelayMs: number = 1200): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    let timerId: NodeJS.Timeout;

    timerId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / durationMs, 1);
        
        // easeOutCubic: 1 - Math.pow(1 - progress, 3)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeProgress * target);
        setCount(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, startDelayMs);

    return () => {
      clearTimeout(timerId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, durationMs, startDelayMs]);

  return count;
}

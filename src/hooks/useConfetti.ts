"use client";

import { useState, useCallback } from "react";

interface UseConfettiReturn {
  isActive: boolean;
  trigger: () => void;
  stop: () => void;
}

export function useConfetti(duration = 6000): UseConfettiReturn {
  const [isActive, setIsActive] = useState(false);

  const trigger = useCallback(() => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), duration);
  }, [duration]);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  return { isActive, trigger, stop };
}

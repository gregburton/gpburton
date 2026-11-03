"use client";

import { useEffect, useState } from "react";

export function useCountdown(retryAt: number | null) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (retryAt === null) return;

    // Refresh immediately, but asynchronously.
    const refreshTimeout = setTimeout(() => {
      setNow(Date.now());
    }, 0);

    // Keep the countdown updated every second.
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearTimeout(refreshTimeout);
      clearInterval(interval);
    };
  }, [retryAt]);

  if (retryAt === null) return null;

  const remainingSeconds = Math.max(0, Math.ceil((retryAt - now) / 1000));

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const format = (value: number) => String(value).padStart(2, "0");

  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

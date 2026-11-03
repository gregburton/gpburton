"use client";

import { useEffect, useState } from "react";

type SongProgressOptions = {
  progressMs: number | null;
  durationMs: number | null;
  fetchedAt: number;
  isPlaying: boolean;
};

export function useSongProgress({
  progressMs,
  durationMs,
  fetchedAt,
  isPlaying,
}: SongProgressOptions) {
  // A clock used to trigger periodic recalculations.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (progressMs === null || durationMs === null || durationMs <= 0) {
    return {
      progressMs: 0,
      percentage: 0,
    };
  }

  // Estimate how far playback has advanced since the fetch.
  const elapsed = isPlaying ? Math.max(0, now - fetchedAt) : 0;

  const estimatedProgress = Math.min(
    durationMs,
    Math.max(0, progressMs + elapsed),
  );

  const percentage = (estimatedProgress / durationMs) * 100;

  return {
    progressMs: estimatedProgress,
    percentage,
  };
}

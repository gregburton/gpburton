"use client";

import { useSongProgress } from "@/hooks/use-song-progress";

type ProgressBarProps = {
  progressMs: number | null;
  durationMs: number | null;
  fetchedAt: number;
  isPlaying: boolean;
};

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
/**
 * The "/api/spotify/queue" route that displays the current song
 * as well as the queue does NOT return the current song's
 * critical `progressMs` value.
 * The end result would be kinda cool as long as I'm not constantly
 * hit with rate limiting issues...
 */
export function SongProgressBar({
  progressMs,
  durationMs,
  fetchedAt,
  isPlaying,
}: ProgressBarProps) {
  const progress = useSongProgress({
    progressMs,
    durationMs,
    fetchedAt,
    isPlaying,
  });

  if (durationMs === null || durationMs <= 0) {
    return null;
  }

  return (
    <div className="w-full max-w-75 mx-auto mt-2">
      <div
        role="progressbar"
        aria-label="Song progress"
        aria-valuemin={0}
        aria-valuemax={durationMs}
        aria-valuenow={Math.round(progress.progressMs)}
        className="h-1.5 w-full overflow-hidden rounded-full bg-gray-300"
      >
        <div
          className="h-full rounded-full bg-green-500"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-xs text-gray-500">
        <span>{formatTime(progress.progressMs)}</span>
        <span>{formatTime(durationMs)}</span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getRetryDelayMs } from "@/lib/time-utils";

type PollingState<T> = {
  data: T | null;
  error: string | null;
  retryAt: number | null;
  isLoading: boolean;
};

const POLL_INTERVAL = 30_000;

export function useSpotifyPolling<T>(
  url: string,
  initialData: T | null = null,
) {
  const [state, setState] = useState<PollingState<T>>({
    data: initialData,
    error: null,
    retryAt: null,
    isLoading: initialData === null,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    let controller: AbortController | undefined;

    async function poll() {
      controller = new AbortController();

      let delay = POLL_INTERVAL;

      try {
        const response = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");

          delay = getRetryDelayMs(retryAfter);

          setState((previous) => ({
            ...previous,
            error: "Spotify rate limit reached",
            retryAt: Date.now() + delay,
            isLoading: false,
          }));
        } else if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        } else {
          const data = (await response.json()) as T;

          setState({
            data,
            error: null,
            retryAt: null,
            isLoading: false,
          });
        }
      } catch (error) {
        if (stopped || controller.signal.aborted) return;

        setState((previous) => ({
          ...previous,
          isLoading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        }));
      } finally {
        if (!stopped) {
          timer = setTimeout(poll, delay);
        }
      }
    }

    void poll();

    return () => {
      stopped = true;
      controller?.abort();

      if (timer) clearTimeout(timer);
    };
  }, [url]);

  return state;
}

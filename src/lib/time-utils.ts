/**
 * @description Makes sure the spotify polling hook supports
 * both formats of Retry-After (number or date) when calculating
 * the deadline.
 * @param retryAfter Number or date value in string format
 * @returns A number
 */
export function getRetryDelayMs(retryAfter: string | null): number {
  if (!retryAfter) return 60_000;

  const seconds = Number(retryAfter);

  if (retryAfter.trim() !== "" && Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1000;
  }

  const retryDate = Date.parse(retryAfter);

  if (!Number.isNaN(retryDate)) {
    return Math.max(0, retryDate - Date.now());
  }

  return 60_000;
}

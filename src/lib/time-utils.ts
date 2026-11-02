// https://stackoverflow.com/a/61791550

// Prepend `0` for one digit numbers. For that the number has to be
// converted to string, as numbers don't have length method
const padTime = (time: number) => {
  return String(time).length === 1 ? `0${time}` : `${time}`;
};

export const formatTime = (time: number) => {
  // Convert seconds into minutes and take the whole part
  const hours = Math.floor(time / 60 / 60);

  // Convert seconds into minutes and take the whole part
  const minutes = Math.floor(time / 60);

  // Get the seconds left after converting minutes
  const seconds = time % 60;

  // Return combined values as string in format mm:ss
  return `${hours}h:${minutes}m:${padTime(seconds)}s`;
};

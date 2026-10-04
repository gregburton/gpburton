import { CurrentlyQueued, PlaybackHistory } from "@/types";
import { SpotifyWidgetClient } from "./spotify-widget-client";

/**
 * ChatGPT said:
 * > "A server component cannot update itself in the browser.
 * Server components render on the server and are only re-executed
 * when the page is rendered/refreshed or when a client-side mechanism
 * causes a new request."
 *
 * It recommended that I keep this server component to privide the
 * initial render/SEO friendly state and to create the client component
 * for the sole purpose of providing live updates.
 *
 * @link https://www.adithyadilum.dev/blog/spotify-web-api-nextjs
 */
export default async function SpotifyWidget() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const response_type = "code";
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const scope =
    "user-read-currently-playing user-read-playback-state user-read-recently-played";
  const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;

  // const response = await fetch(
  //   process.env.BASE_URL + "/api/spotify/currently-playing",
  // );
  // const track = (await response.json()) as CurrentlyPlayingResponse;

  const queueResponse = await fetch(
    process.env.BASE_URL + "/api/spotify/queue",
  );
  const queue = (await queueResponse.json()) as CurrentlyQueued;

  const historyResponse = await fetch(
    process.env.BASE_URL + "/api/spotify/history",
  );
  const history = (await historyResponse.json()) as PlaybackHistory;

  return (
    <SpotifyWidgetClient
      initialQueue={queue}
      initialHistory={history}
      authUrl={SPOTIFY_AUTH_URL}
    />
  );
}

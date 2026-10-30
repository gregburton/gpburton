import { SpotifyWidgetClient } from "./spotify-widget-client";
import { CurrentlyQueued, PlaybackHistory } from "@/types";
import { SpotifyWidgetClientError } from "./spotify-widget-client-error";

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

  /**
   * The below code would only be useful if I wanted to create a
   * progress bar that estimates where I am in a song. I may implement
   * this at a later time.
   */
  // const response = await fetch(
  //   process.env.BASE_URL + "/api/spotify/currently-playing",
  // );
  // const track = (await response.json()) as CurrentlyPlayingResponse;

  /**
   * Had to do some interesting error handling to fix a build error:
   *
   * Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
   * [TypeError: fetch failed] {
   *   digest: '3227098399',
   *   [cause]: AggregateError:
   *       at ignore-listed frames {
   *     code: 'ECONNREFUSED',
   *     [errors]: [ [Error], [Error] ]
   *   }
   * }
   */

  const [queueResponse, historyResponse] = await Promise.all([
    fetch(process.env.BASE_URL + "/api/spotify/queue"),
    fetch(process.env.BASE_URL + "/api/spotify/history"),
  ]);

  /** Connection to Spotify failed*/
  if (!queueResponse.ok || !historyResponse.ok) {
    return <SpotifyWidgetClientError authUrl={SPOTIFY_AUTH_URL} />;
  }

  const queue = (await queueResponse.json()) as CurrentlyQueued;
  const history = (await historyResponse.json()) as PlaybackHistory;

  console.log(queue);
  console.log(history);

  /**
   * The request succeeded, but there's an issue with the response.
   * It's ok if there's no track playing. The widget will display
   * the history instead.
   */
  if (queue.reason !== "NOT_PLAYING_A_TRACK" || history.reason) {
    return <SpotifyWidgetClientError authUrl={SPOTIFY_AUTH_URL} />;
  }

  /** Everything succeeded */
  return <SpotifyWidgetClient initialQueue={queue} initialHistory={history} />;
}

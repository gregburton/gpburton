import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-utils";
import { QueueApiResponse, SpotifyTrack } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const inactive = (reason: string) => ({
  reason,
  fetchedAt: Date.now(),
  currently_playing: {
    active: false,
    trackName: "",
    trackNumber: 0,
    artistName: "",
    albumName: "",
    albumReleaseDate: "",
    albumTotalTracks: 0,
    albumArtUrl: "",
    trackUrl: "",
    durationMs: 0,
    /**
     * progressMs isn't returned from this endpoint.
     * This means I would need to use the '/currently_playing'
     * endpoint in order to make a progress bar. If I did that
     * then I would need to strip out the currently_playing info
     * out of this route handler.
     */
    // progressMs: 0,
  },
  queue: [],
});

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    // Treat an empty upstream response as a normal inactive state.
    if (response.status === 204) {
      return NextResponse.json(inactive("NO_ACTIVE_PLAYBACK"));
    }

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      return NextResponse.json(inactive("RATE_LIMITED"), {
        status: 503,
        headers: retryAfter ? { "Retry-After": retryAfter } : undefined,
      });
    }

    if (!response.ok) {
      throw new Error(`Spotify playback request failed: ${response.status}`);
    }

    const playback = (await response.json()) as QueueApiResponse;
    const item = playback.currently_playing;

    if (!item || item.type !== "track") {
      return NextResponse.json(inactive("NOT_PLAYING_A_TRACK"));
    }

    const track = item as SpotifyTrack;
    const queue = playback.queue.map((track) => ({
      trackName: track.name,
      trackNumber: track.track_number,
      artistName: track.artists.map((artist) => artist.name).join(", "),
      albumName: track.album.name,
      albumReleaseDate: track.album.release_date,
      albumTotalTracks: track.album.total_tracks,
      albumArtUrl: track.album.images[0]?.url ?? "",
      trackUrl: track.external_urls.spotify,
      durationMs: track.duration_ms,
    }));

    return NextResponse.json({
      fetchedAt: Date.now(),
      currently_playing: {
        active: true,
        trackName: track.name,
        trackNumber: track.track_number,
        artistName: track.artists.map((artist) => artist.name).join(", "),
        albumName: track.album.name,
        albumReleaseDate: track.album.release_date,
        albumTotalTracks: track.album.total_tracks,
        albumArtUrl: track.album.images[0]?.url ?? "",
        trackUrl: track.external_urls.spotify,
        durationMs: track.duration_ms,
      },
      queue: queue,
    });
  } catch (error) {
    console.error("Spotify now-playing sync failed", error);
    return NextResponse.json(inactive("SPOTIFY_UNAVAILABLE"));
  }
}

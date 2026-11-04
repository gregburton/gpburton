import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-utils";
import { QueueApiResponse } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const inactive = (reason: string) => ({
  reason,
  active: false,
  fetchedAt: Date.now(),
  queue: [],
});

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    /** Treat an empty upstream response as a normal inactive state. */
    if (response.status === 204) {
      return NextResponse.json(inactive("NO_ACTIVE_PLAYBACK"));
    }
    /** Bad request */
    if (response.status === 400) {
      return NextResponse.json(inactive("BAD_REQUEST"), { status: 400 });
    }
    /** Authorization problem */
    if (response.status === 401) {
      return NextResponse.json(inactive("UNAUTHORIZED"), { status: 401 });
    }
    /** Rate limited */
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      return NextResponse.json(inactive("RATE_LIMITED"), {
        status: 429,
        headers: retryAfter ? { "Retry-After": retryAfter } : undefined,
      });
    }
    /** Unknown server error - Spotify claims this should never happen and to contact them if it does */
    if (response.status === 500) {
      return NextResponse.json(inactive("INTERNAL_SERVER_ERROR"), {
        status: 500,
      });
    }
    /** Spotify's servers are temporarily unavailable */
    if (response.status === 503) {
      return NextResponse.json(inactive("SERVICE_UNAVAILABLE"), {
        status: 503,
      });
    }
    /** An unhandled error occured */
    if (!response.ok) {
      throw new Error(`Spotify playback request failed: ${response.status}`);
    }

    const playback = (await response.json()) as QueueApiResponse;
    const item = playback.currently_playing;

    if (!item || item.type !== "track") {
      return NextResponse.json(inactive("NOT_PLAYING_A_TRACK"));
    }

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
      active: true,
      fetchedAt: Date.now(),
      queue: queue,
    });
  } catch (error) {
    console.error("Spotify queue sync failed", error);
    return NextResponse.json(inactive("SPOTIFY_UNAVAILABLE"));
  }
}

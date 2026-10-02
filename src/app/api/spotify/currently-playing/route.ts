import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-utils";
import { PlaybackResponse, SpotifyTrack } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const inactive = (reason: string) => ({
  active: false,
  reason,
  trackName: "",
  artistName: "",
  albumArtUrl: "",
  trackUrl: "",
  progressMs: 0,
  durationMs: 0,
  fetchedAt: Date.now(),
});

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );

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

    const playback = (await response.json()) as PlaybackResponse;
    const item = playback.item;

    if (!playback.is_playing || !item || item.type !== "track") {
      return NextResponse.json(inactive("NOT_PLAYING_A_TRACK"));
    }

    const track = item as SpotifyTrack;

    return NextResponse.json({
      active: true,
      trackName: track.name,
      trackNumber: track.track_number,
      artistName: track.artists.map((artist) => artist.name).join(", "),
      albumName: track.album.name,
      albumReleaseDate: track.album.release_date,
      albumTotalTracks: track.album.total_tracks,
      albumArtUrl: track.album.images[0]?.url ?? "",
      trackUrl: track.external_urls.spotify,
      progressMs: playback.progress_ms ?? 0,
      durationMs: track.duration_ms,
      fetchedAt: Date.now(),
    });
  } catch (error) {
    console.error("Spotify now-playing sync failed", error);
    return NextResponse.json(inactive("SPOTIFY_UNAVAILABLE"));
  }
}

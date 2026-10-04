import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-utils";
import { HistoryApiResponse } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fetchError = (reason: string) => ({
  reason,
});

export async function GET() {
  try {
    /** Default: 20. Range: 0-50 */
    const limit = 10;
    const accessToken = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      return NextResponse.json(fetchError("RATE_LIMITED"), {
        status: 503,
        headers: retryAfter ? { "Retry-After": retryAfter } : undefined,
      });
    }

    if (!response.ok) {
      throw new Error(`Spotify history request failed: ${response.status}`);
    }

    const history = (await response.json()) as HistoryApiResponse;
    const list = history.items;

    const responseObj = list.reverse().map((item) => ({
      trackName: item.track.name,
      artistName: item.track.artists.map((artist) => artist.name).join(", "),
      albumName: item.track.album.name,
      albumArtUrl: item.track.album.images[0]?.url ?? "",
      trackUrl: item.track.external_urls.spotify,
    }));

    return NextResponse.json({
      fetchedAt: Date.now(),
      history: responseObj,
    });
  } catch (error) {
    console.error("Spotify now-playing sync failed", error);
    return NextResponse.json(fetchError("SPOTIFY_UNAVAILABLE"));
  }
}

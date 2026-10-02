import Image from "next/image";
import { cn } from "cn";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "./ui/button";
import { CurrentlyPlayingResponse } from "@/types";
import {
  ExternalLinkIcon,
  User2Icon,
  Disc3Icon,
  MusicIcon,
} from "lucide-react";

/**
 * @link https://www.adithyadilum.dev/blog/spotify-web-api-nextjs
 */
export default async function SpotifyWidget() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const response_type = "code";
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = "user-read-currently-playing";
  const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;

  // const estimatedProgress = Math.min(
  //   nowPlaying.durationMs,
  //   nowPlaying.progressMs + (Date.now() - nowPlaying.fetchedAt),
  // );

  const response = await fetch(
    process.env.BASE_URL + "/api/spotify/currently-playing",
  );

  const track = (await response.json()) as CurrentlyPlayingResponse;

  if (response.ok && track.active) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>What I&apos;m listening to</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            loading="eager"
            src={track.albumArtUrl}
            alt={track.artistName + " - " + track.trackName}
            width={300}
            height={300}
          />
          <p className="flex items-center gap-x-2">
            <User2Icon /> {track.artistName}
          </p>
          <p className="flex items-center gap-x-2">
            <MusicIcon /> {track.trackName}
          </p>
          <p className="flex items-center gap-x-2">
            <Disc3Icon /> {track.albumName}
          </p>
        </CardContent>
        <CardFooter>
          <a
            href={track.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-green-500",
            )}
          >
            Listen on Spotify <ExternalLinkIcon />
          </a>
        </CardFooter>
      </Card>
    );
  }

  if (response.ok && !track.active) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>What I&apos;m listening to</CardTitle>
        </CardHeader>
        <CardContent>Nothing at this moment. Check back later!</CardContent>
      </Card>
    );
  }

  return (
    <div>
      <a
        href={SPOTIFY_AUTH_URL}
        className={buttonVariants({ variant: "default" })}
      >
        Authorize Spotify
      </a>
    </div>
  );
}

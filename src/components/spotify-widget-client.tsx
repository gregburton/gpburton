"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  User2Icon,
  Disc3Icon,
  MusicIcon,
  VolumeXIcon,
  GhostIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { CurrentlyPlayingResponse } from "@/types";

/**
 * @link https://developer.spotify.com/documentation/design
 */
export function SpotifyWidgetClient({
  initialData,
  authUrl,
}: {
  initialData: CurrentlyPlayingResponse;
  authUrl: string;
}) {
  const [track, setTrack] = useState(initialData);

  // const estimatedProgress = Math.min(
  //   nowPlaying.durationMs,
  //   nowPlaying.progressMs + (Date.now() - nowPlaying.fetchedAt),
  // );

  useEffect(() => {
    const update = async () => {
      const response = await fetch("/api/spotify/currently-playing", {
        cache: "no-store",
      });

      if (response.ok) {
        setTrack(await response.json());
      }
    };

    const interval = setInterval(update, 30_000);

    return () => clearInterval(interval);
  }, []);

  if (track.active) {
    return (
      <Card className="p-0 w-full max-w-75">
        <CardHeader className="p-0">
          <Image
            loading="eager"
            src={track.albumArtUrl}
            alt={track.artistName + " - " + track.trackName}
            width={300}
            height={300}
          />
        </CardHeader>
        <CardContent>
          <p>I&apos;m currently listening to:</p>
          <p className="flex items-center gap-x-2">
            <MusicIcon className="flex-none" /> {track.trackName}
          </p>
          <p className="flex items-center gap-x-2">
            <User2Icon className="flex-none" /> {track.artistName}
          </p>
          <p className="flex items-center gap-x-2">
            <Disc3Icon className="flex-none" /> {track.albumName}
          </p>
        </CardContent>
        <CardFooter className="pb-5 justify-center">
          <a
            href={track.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground flex flex-col items-center"
          >
            <span>Listen on</span>
            <Image
              loading="eager"
              src="/images/logos/spotify/Full_Logo_Green_RGB.svg"
              alt="Spotify Full Logo - Green"
              width={150}
              height={150}
            />
          </a>
        </CardFooter>
      </Card>
    );
  }

  if (!track.active) {
    return (
      <Card className="p-0 w-full max-w-75">
        <CardHeader className="p-0 w-75 h-75 flex items-center justify-center bg-accent">
          <VolumeXIcon className="text-muted-foreground w-20 h-20" />
        </CardHeader>
        <CardContent className="pb-5">
          <p>I&apos;m not currently listening to anything. Check back later!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-0 w-full max-w-75">
      <CardHeader className="p-0 w-75 h-75 flex items-center justify-center bg-accent">
        <GhostIcon className="text-muted-foreground w-20 h-20" />
      </CardHeader>
      <CardContent className="pb-5">
        <p>Connection to Spotify has been lost!</p>
        <a href={authUrl} className={buttonVariants({ variant: "secondary" })}>
          Reconnect to Spotify
        </a>
      </CardContent>
    </Card>
  );
}

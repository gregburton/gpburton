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
import { CurrentlyQueuedResponse } from "@/types";

/**
 * @link https://developer.spotify.com/documentation/design
 */
export function SpotifyWidgetClient({
  initialData,
  authUrl,
}: {
  initialData: CurrentlyQueuedResponse;
  authUrl: string;
}) {
  const [queue, setQueue] = useState(initialData);

  // const estimatedProgress = Math.min(
  //   nowPlaying.durationMs,
  //   nowPlaying.progressMs + (Date.now() - nowPlaying.fetchedAt),
  // );

  useEffect(() => {
    const update = async () => {
      const response = await fetch("/api/spotify/queue", {
        cache: "no-store",
      });

      if (response.ok) {
        setQueue(await response.json());
      }
    };

    const interval = setInterval(update, 30_000);

    return () => clearInterval(interval);
  }, []);

  if (queue.currently_playing.active) {
    return (
      <div>
        <Card className="p-0 w-full max-w-75">
          <CardHeader className="p-0">
            <Image
              loading="eager"
              src={queue.currently_playing.albumArtUrl}
              alt={
                queue.currently_playing.artistName +
                " - " +
                queue.currently_playing.trackName
              }
              width={300}
              height={300}
            />
          </CardHeader>
          <CardContent>
            <p>I&apos;m currently listening to:</p>
            <p className="flex items-center gap-x-2">
              <MusicIcon className="flex-none" />{" "}
              {queue.currently_playing.trackName}
            </p>
            <p className="flex items-center gap-x-2">
              <User2Icon className="flex-none" />{" "}
              {queue.currently_playing.artistName}
            </p>
            <p className="flex items-center gap-x-2">
              <Disc3Icon className="flex-none" />{" "}
              {queue.currently_playing.albumName}
            </p>
          </CardContent>
          <CardFooter className="pb-5 justify-center">
            <a
              href={queue.currently_playing.trackUrl}
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
        <Card>
          <CardHeader>Up Next</CardHeader>
          <CardContent>
            <ul className="divide-y divide-muted-foreground">
              {queue.queue.map((track) => (
                <li key={track.trackName}>
                  <a
                    href={track.trackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-4 hover:bg-accent transition-colors"
                  >
                    <Image
                      src={track.albumArtUrl}
                      alt={track.artistName + " - " + track.trackName}
                      width={50}
                      height={50}
                    />
                    <div>
                      <p className="text-lg">{track.trackName}</p>
                      <p className="text-muted-foreground">
                        {track.artistName}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!queue.currently_playing.active) {
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

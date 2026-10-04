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

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { CurrentlyQueued, PlaybackHistory } from "@/types";

/**
 * @link https://developer.spotify.com/documentation/design
 */
export function SpotifyWidgetClient({
  initialQueue,
  initialHistory,
  authUrl,
}: {
  initialQueue: CurrentlyQueued;
  initialHistory: PlaybackHistory;
  authUrl: string;
}) {
  const [queue, setQueue] = useState(initialQueue);
  const [history, setHistory] = useState(initialHistory);

  // const estimatedProgress = Math.min(
  //   nowPlaying.durationMs,
  //   nowPlaying.progressMs + (Date.now() - nowPlaying.fetchedAt),
  // );

  useEffect(() => {
    const update = async () => {
      const queueResponse = await fetch("/api/spotify/queue", {
        cache: "no-store",
      });

      if (queueResponse.ok) {
        setQueue(await queueResponse.json());
      }
      const historyResponse = await fetch("/api/spotify/history", {
        cache: "no-store",
      });

      if (historyResponse.ok) {
        setHistory(await historyResponse.json());
      }
    };

    const interval = setInterval(update, 30_000);

    return () => clearInterval(interval);
  }, []);

  if (queue.currently_playing.active) {
    return (
      <div>
        <Card className="w-full p-0">
          <CardContent className="">
            <Accordion defaultValue={["current"]} multiple>
              <AccordionItem value="history">
                <AccordionContent>
                  <ul className="divide-y divide-muted-foreground">
                    {history.history.map((track) => (
                      <li key={track.trackName}>
                        <a
                          href={track.trackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-x-4 hover:bg-accent transition-colors decoration-0"
                        >
                          <Image
                            src={track.albumArtUrl}
                            alt={track.artistName + " - " + track.trackName}
                            width={50}
                            height={50}
                          />
                          <div>
                            <p className="font-bold mb-0! md:font-semibold md:text-lg">
                              {track.trackName}
                            </p>
                            <p className="text-muted-foreground">
                              {track.artistName}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
                <AccordionTrigger>Previously Played</AccordionTrigger>
              </AccordionItem>

              <AccordionItem value="current">
                {/* <AccordionTrigger>Previously Played</AccordionTrigger> */}
                <AccordionContent className="pb-0 grid gap-4 justify-items-center grid-cols-1 md:grid-cols-[300px_1fr] md:justify-items-start">
                  <div>
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
                  </div>
                  <div className="flex flex-col gap-y-4 w-full items-center justify-between md:items-start py-4">
                    <div className="">
                      <p>I&apos;m currently listening to:</p>
                      <p className="flex items-center gap-x-2 md:text-3xl">
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
                    </div>
                    <div className="flex md:self-end">
                      <a
                        href={queue.currently_playing.trackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground text-center"
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
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="queue">
                <AccordionTrigger>Up Next</AccordionTrigger>
                <AccordionContent>
                  <ul className="divide-y divide-muted-foreground">
                    {queue.queue.map((track) => (
                      <li key={track.trackName}>
                        <a
                          href={track.trackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-x-4 hover:bg-accent transition-colors decoration-0"
                        >
                          <Image
                            src={track.albumArtUrl}
                            alt={track.artistName + " - " + track.trackName}
                            width={50}
                            height={50}
                          />
                          <div className="flex flex-col">
                            <p className="font-bold mb-0! md:font-semibold md:text-lg">
                              {track.trackName}
                            </p>
                            <p className="text-muted-foreground">
                              {track.artistName}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

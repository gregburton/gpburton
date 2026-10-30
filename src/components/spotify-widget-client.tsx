"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User2Icon, Disc3Icon, MusicIcon, VolumeXIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CurrentlyQueued, PlaybackHistory } from "@/types";

/**
 * @link https://developer.spotify.com/documentation/design
 */
export function SpotifyWidgetClient({
  initialQueue,
  initialHistory,
}: {
  initialQueue: CurrentlyQueued;
  initialHistory: PlaybackHistory;
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
  }, [queue.currently_playing.active]);

  return (
    <div>
      <Card className="p-0">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-[300px_1fr] justify-items-center md:justify-items-start">
          {/* Currently Playing */}
          {queue.currently_playing.active ? (
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
                className="rounded-xl mx-auto"
              />
              <p className="text-muted-foreground text-center pt-1 pb-2">
                I&apos;m currently listening to:
              </p>
              <div className="flex flex-col gap-y-5 w-full items-center px-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-x-2 text-xl">
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
                <div className="flex hover:underline">
                  <a
                    href={queue.currently_playing.trackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground"
                  >
                    <span className="relative top-2 left-13 block w-full">
                      Listen on
                    </span>
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
            </div>
          ) : (
            <div>
              <div className="p-0 w-full max-w-75 h-75 flex items-center justify-center bg-accent rounded-xl mx-auto md:mx-0">
                <VolumeXIcon className="text-muted-foreground w-20 h-20" />
              </div>
              <div className="px-8">
                <p className="text-muted-foreground pt-1 pb-2">
                  I&apos;m not currently listening to anything. Check back
                  later!
                </p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs
            defaultValue={queue.currently_playing.active ? "queue" : "history"}
            className="justify-self-stretch"
          >
            <TabsList>
              <TabsTrigger
                value="queue"
                disabled={!queue.currently_playing.active}
              >
                Up Next
              </TabsTrigger>
              <TabsTrigger value="history">Previously Played</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-127.25 w-full">
              <TabsContent value="queue">
                <ul className="divide-y divide-muted-foreground">
                  {queue.queue.map((track, index) => (
                    <li key={`${track.trackName}-${index}`}>
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
                          <p className="font-bold mb-0! md:font-semibold lg:text-lg">
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
              </TabsContent>
              <TabsContent value="history">
                <ul className="divide-y divide-muted-foreground">
                  {history.history.map((track, index) => (
                    <li key={`${track.trackName}-${index}`}>
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
                          <p className="font-bold mb-0! md:font-semibold lg:text-lg">
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
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

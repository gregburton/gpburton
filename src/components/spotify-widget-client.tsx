"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { useSpotifyPolling } from "@/hooks/use-spotify-polling";
import Image from "next/image";
import { User2Icon, Disc3Icon, MusicIcon, VolumeXIcon } from "lucide-react";

// import { SongProgressBar } from "./spotify-song-progress";
import { SpotifyWidgetClientSkeleton } from "@/components/spotify-widget-client-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CurrentlyQueued, PlaybackHistory } from "@/types";

/**
 * @link https://developer.spotify.com/documentation/design
 */
export function SpotifyWidgetClient() {
  const queue = useSpotifyPolling<CurrentlyQueued>("/api/spotify/queue");
  const history = useSpotifyPolling<PlaybackHistory>("/api/spotify/history");
  const queueCountdown = useCountdown(queue.retryAt);
  const historyCountdown = useCountdown(history.retryAt);

  if (queue.isLoading || history.isLoading) {
    return <SpotifyWidgetClientSkeleton />;
  }

  return (
    <div>
      <Card className="p-0">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-[300px_1fr] justify-items-center md:justify-items-start">
          {queue.error ? (
            <div className="w-full">
              <div className="p-0 w-full max-w-75 h-75 flex items-center justify-center bg-accent rounded-xl mx-auto md:mx-0">
                <VolumeXIcon className="text-muted-foreground w-20 h-20" />
              </div>
              <div className="px-8 pt-1 pb-2">
                <p>Something went wrong.</p>
                <p className="text-red-400">{queue.error}</p>
                {queueCountdown && (
                  <p>Attempting to refetch in {queueCountdown}</p>
                )}
              </div>
            </div>
          ) : !queue.data ? (
            <div className="w-full">
              <div className="p-0 w-full max-w-75 h-75 flex items-center justify-center bg-accent rounded-xl mx-auto md:mx-0">
                <VolumeXIcon className="text-muted-foreground w-20 h-20" />
              </div>
              <div className="px-8 pt-1 pb-2">
                <p>Something went wrong.</p>
                <p className="text-red-400">No data to display...</p>
              </div>
            </div>
          ) : queue.data.currently_playing.active ? (
            <div className="w-full">
              <Image
                loading="eager"
                src={queue.data.currently_playing.albumArtUrl}
                alt={
                  queue.data.currently_playing.artistName +
                  " - " +
                  queue.data.currently_playing.trackName
                }
                width={300}
                height={300}
                className="rounded-xl mx-auto"
              />
              {/* <SongProgressBar
                progressMs={queue.data.currently_playing.progressMs ?? null}
                durationMs={queue.data.currently_playing.durationMs ?? null}
                fetchedAt={queue.data.fetchedAt ?? 0}
                isPlaying={queue.data.currently_playing.active ?? false}
              /> */}
              <p className="text-muted-foreground text-center pt-1 pb-2">
                I&apos;m currently listening to:
              </p>
              <div className="flex flex-col gap-y-5 w-full items-center px-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-x-2 text-xl">
                    <MusicIcon className="flex-none" />{" "}
                    {queue.data.currently_playing.trackName}
                  </p>
                  <p className="flex items-center gap-x-2">
                    <User2Icon className="flex-none" />{" "}
                    {queue.data.currently_playing.artistName}
                  </p>
                  <p className="flex items-center gap-x-2">
                    <Disc3Icon className="flex-none" />{" "}
                    {queue.data.currently_playing.albumName}
                  </p>
                </div>
                <div className="flex hover:underline">
                  <a
                    href={queue.data.currently_playing.trackUrl}
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
            <div className="w-full">
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

          <Tabs
            defaultValue={
              queue.data?.currently_playing.active ? "queue" : "history"
            }
            className="justify-self-stretch"
          >
            <TabsList>
              <TabsTrigger
                value="queue"
                disabled={!queue.data?.currently_playing.active}
              >
                Up Next
              </TabsTrigger>
              <TabsTrigger value="history">Previously Played</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-127.25 w-full">
              <TabsContent value="queue">
                <ul className="divide-y divide-muted-foreground">
                  {queue.data?.queue.map((track, index) => (
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
                {history.error ? (
                  <>
                    <div className="px-8 pt-1 pb-2">
                      <p className="text-red-400">{history.error}</p>
                      {historyCountdown && (
                        <p>Attempting to refetch in {historyCountdown}</p>
                      )}
                    </div>
                    <ul className="divide-y divide-muted-foreground">
                      {Array.from({ length: 8 }).map((_, index) => (
                        <li key={index}>
                          <div className="flex items-center gap-x-4">
                            <div className="w-12.5 h-12.5 bg-accent animate-pulse" />
                            <div className="flex flex-col flex-1 gap-y-2">
                              <div className="h-4 w-40 bg-accent animate-pulse" />
                              <div className="h-2 w-20 bg-accent animate-pulse" />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : !history.data ? (
                  <div className="px-8 pt-1 pb-2">
                    <p>Something went wrong.</p>
                    <p className="text-red-400">No data to display...</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-muted-foreground">
                    {history.data.history.map((track, index) => (
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
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

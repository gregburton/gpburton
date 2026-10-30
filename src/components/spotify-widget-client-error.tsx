import { cn } from "cn";
import { GhostIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "./ui/button";

export function SpotifyWidgetClientError({ authUrl }: { authUrl: string }) {
  return (
    <div>
      <Card className="p-0">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-[300px_1fr] justify-items-center md:justify-items-start">
          <div>
            <div className="p-0 w-full max-w-75 h-75 flex items-center justify-center bg-accent rounded-xl mx-auto md:mx-0">
              <GhostIcon className="text-muted-foreground w-20 h-20" />
            </div>
            <div className="px-8 pt-1 pb-2 space-y-2">
              <p>Connection to Spotify has been lost!</p>
              <a
                href={authUrl}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full",
                )}
              >
                Attempt to Reconnect
              </a>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="queue" className="justify-self-stretch">
            <TabsList>
              <TabsTrigger value="queue">Up Next</TabsTrigger>
              <TabsTrigger value="history">Previously Played</TabsTrigger>
            </TabsList>
            <TabsContent value="queue">
              <ul className="divide-y divide-muted-foreground">
                {Array.from({ length: 10 }).map((_, index) => (
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
            </TabsContent>
            <TabsContent value="history">
              <ul className="divide-y divide-muted-foreground">
                {Array.from({ length: 10 }).map((_, index) => (
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

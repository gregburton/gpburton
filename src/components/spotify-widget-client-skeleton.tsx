import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SpotifyWidgetClientSkeleton() {
  return (
    <div>
      <Card className="p-0">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-[300px_1fr] justify-items-center md:justify-items-start">
          <div className="w-full">
            <div className="p-0 w-full max-w-75 h-75 bg-accent rounded-xl animate-pulse" />
            <div className="px-8 pt-5 space-y-4">
              <div className="h-4 w-full bg-accent animate-pulse" />
              <div className="h-2 w-[80%] bg-accent animate-pulse" />
              <div className="h-2 w-[80%] bg-accent animate-pulse" />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="queue" className="justify-self-stretch">
            <TabsList>
              <TabsTrigger value="queue" disabled>
                Up Next
              </TabsTrigger>
              <TabsTrigger value="history" disabled>
                Previously Played
              </TabsTrigger>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

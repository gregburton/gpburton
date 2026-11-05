"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

import { ClipPlayer } from "@/components/clips/clip-player";
import { Clip } from "@/types";
import { PlayCircleIcon } from "lucide-react";

export function ClipCard({ clip }: { clip: Clip }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <ClipPlayer
          clip={clip}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}

      <Card className="pt-0 max-w-md md:max-w-full">
        <div
          className="group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <CardContent className="p-0 relative">
            <PlayCircleIcon className="transition-all z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-0 group-hover:size-30" />
            <Image
              src={clip.thumbnailUrl ?? "/images/placeholder.jpg"}
              alt={`${clip.game} - ${clip.title}`}
              width={500}
              height={500}
              className="transition-all group-hover:brightness-125"
            />
          </CardContent>
          <CardHeader className="py-5 rounded-t-none transition-all group-hover:bg-accent">
            <CardTitle>{clip.title}</CardTitle>
            <CardDescription>
              {clip.game} - {format(new Date(clip.createdAt), "MMM Mo, yyyy")}
            </CardDescription>
            <p className="pt-2">{clip.description}</p>
          </CardHeader>
        </div>
        <CardFooter className="flex-col gap-y-4">
          <a
            href={clip.medalUrl}
            className={buttonVariants({ variant: "secondary" })}
          >
            View on Medal
          </a>
        </CardFooter>
      </Card>
    </>
  );
}

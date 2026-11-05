import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Clip } from "@/types";

type ClipPlayerProps = {
  clip: Clip;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ClipPlayer({ clip, isOpen, setIsOpen }: ClipPlayerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="md:max-w-[80%]">
        <iframe
          src={clip.embedUrl}
          title={clip.title}
          allowFullScreen
          loading="lazy"
          className="aspect-video w-full"
        />
        <DialogHeader>
          <DialogTitle>{clip.title}</DialogTitle>
          <DialogDescription>
            {clip.game} - {format(new Date(clip.createdAt), "MMM Mo, yyyy")}
          </DialogDescription>
        </DialogHeader>
        <p>{clip.description}</p>
      </DialogContent>
    </Dialog>
  );
}

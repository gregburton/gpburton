import Image from "next/image";
import { cn } from "cn";

import { StackHighlightProps } from "@/types";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StackHighlight = ({
  image,
  altText,
  title,
  subtitle,
  url,
}: StackHighlightProps) => {
  return (
    <Card className="h-full w-full max-w-xs mx-auto text-center flex flex-col">
      <CardHeader>
        {/* Image Wrapper*/}
        <div className="m-auto flex flex-col items-center justify-center">
          {/* Fix Image warnings: https://stackoverflow.com/a/74252384 */}
          <Image
            src={image}
            alt={altText}
            width="0"
            height="0"
            sizes="100vw"
            className="w-25 h-25 object-contain"
          />
        </div>
        <CardTitle className="text-xl ">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{subtitle}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <a
          href={url}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "link mx-auto",
          )}
        >
          Learn More
        </a>
      </CardFooter>
    </Card>
  );
};

export default StackHighlight;

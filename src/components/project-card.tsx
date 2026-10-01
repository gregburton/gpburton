import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";

import { ProjectProps } from "@/types";

const ProjectCard = ({
  image,
  name,
  description,
  link,
  tools,
}: ProjectProps) => {
  return (
    <Card className="h-full w-full max-w-xs mx-auto flex flex-col">
      <Image
        src={image}
        alt={name}
        priority
        width={450}
        height={450}
        className="object-cover rounded-t-lg"
      />
      <CardHeader>
        <CardTitle className="text-center text-xl mt-2">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {link && (
          <div className="flex items-start">
            {link.external ? (
              <a
                href={link.url}
                className={buttonVariants({ variant: "default" })}
              >
                Live Demo
              </a>
            ) : (
              <Link
                href={link.url}
                className={buttonVariants({ variant: "default" })}
              >
                Live Demo
              </Link>
            )}
          </div>
        )}

        {tools.length > 0 && (
          <div>
            <p className="text-center text-muted-foreground text-xs">
              Built with
            </p>
            <ul className="flex gap-3 justify-center">
              {tools.map((tool) => (
                <li key={tool.title}>
                  <TooltipProvider delay={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <a href={tool.url}>
                          <Image
                            src={tool.image}
                            alt={tool.title}
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-8.75 h-8.75 object-contain"
                          />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tool.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

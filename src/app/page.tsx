import { Metadata } from "next";
import Link from "next/link";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-scale";
import StackHighlight from "@/components/stack-highlight";
import SpotifyWidget from "@/components/spotify-widget";

import tools from "@/lib/tools";
import { getAllPosts } from "@/lib/blog-utils";
import { Mail } from "lucide-react";
import projects from "@/lib/projects";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home | gpburton",
  description:
    "Welcome to my portfolio. Browse through my projects or read my blog to learn more about my experience as a web developer.",
};

export default function Home() {
  const allBlogs = getAllPosts();

  return (
    <main className="container mt-5 mb-20 flex flex-col gap-14">
      <section className="flex flex-col lg:flex-row gap-5">
        <Card className="max-w-fit self-start mx-auto lg:mx-0">
          <CardHeader className="items-center text-center">
            <Avatar size="huge" className="mx-auto">
              <AvatarImage
                src="https://github.com/gregburton.png"
                alt="Greg Burton's GitHub profile picture"
              />
              <AvatarFallback>GB</AvatarFallback>
            </Avatar>
            <CardTitle>
              <h1 className="text-3xl">Greg Burton</h1>
            </CardTitle>
            <CardDescription>
              <p>I like music, gaming, react.js, and taco bell.</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="https://github.com/gregburton"
              className="flex items-center gap-x-3 group"
            >
              <svg
                // https://simpleicons.org/
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 shrink-0 transition-all fill-muted-foreground group-hover:fill-foreground"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="transition-all underline underline-offset-2 decoration-muted-foreground group-hover:underline-offset-4 group-hover:decoration-foreground">
                https://github.com/gregburton
              </span>
            </a>
            <a
              href="mailto:grepburton@gmail.com"
              className="flex items-center gap-x-3 group"
            >
              <Mail className="w-6 h-6 shrink-0 transition-all stroke-muted-foreground group-hover:stroke-foreground" />
              <span className="transition-all underline underline-offset-2 decoration-muted-foreground group-hover:underline-offset-4 group-hover:decoration-foreground">
                grepburton@gmail.com
              </span>
            </a>
          </CardContent>
        </Card>

        <div className="flex-1">
          <div className="mb-5">
            <h1 className="text-3xl">Welcome to my site!</h1>
            <p>Take a look at the things that I enjoy spending time on.</p>
          </div>
          <div>
            <h2 className="text-xl">About me</h2>
            <div className="space-y-5">
              <p>
                I&apos;ve been using computers for as long as I can remember.
                Some of my earliest memories include spending countless hours on
                games such as{" "}
                <a
                  href="https://en.wikipedia.org/wiki/SkiFree"
                  className="link link-external"
                >
                  SkiFree
                </a>
                ,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Chip%27s_Challenge"
                  className="link link-external"
                >
                  Chip&apos;s Challenge
                </a>
                ,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Pong:_The_Next_Level"
                  className="link link-external"
                >
                  Pong: The Next Level
                </a>
                ,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Centipede_(1998_video_game)"
                  className="link link-external"
                >
                  Centipede
                </a>{" "}
                (the 3d one),{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Carnivores_(video_game)"
                  className="link link-external"
                >
                  Carnivores
                </a>
                , and many more. I&apos;ve always been a gamer at heart and grew
                up playing many more throughout the years on various platforms.
                My favorite games these days are created by{" "}
                <a
                  href="https://www.fromsoftware.jp/ww/"
                  className="link link-external"
                >
                  FromSoftware
                </a>
                .
              </p>
              <p>
                Fast forward to adulthood. I studied Information Technology at{" "}
                <a href="https://ualr.edu/www/" className="link link-external">
                  UA Little Rock
                </a>{" "}
                with a major in Web Design &amp; Development. My classes
                primarily focused on the <em>design</em> aspect. A majority of
                my studies involved learning and practicing various graphic
                design principles. I became well versed in various Adobe
                programs. I was hoping to learn the nitty-gritty of coding
                websites from scratch, but unfortunately there wasn&apos;t much
                of a focus on that. After graduating, I took quite a few{" "}
                <a href="https://www.udemy.com/" className="link link-external">
                  Udemy
                </a>{" "}
                courses to learn all the cool aspects of building websites from
                scratch. My university courses gave me a fair bit of fundamental
                knowledge, but I quickly learned that there was a crazy amount
                of stuff to understand!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      {/* 
        <p>small business site (get a quote)</p>
        <p>medium business site (multiple locations)</p>
        <p>record keeping site (employees, students)</p>
        <p>restaurant site</p>
        <p>state park site</p>
        <p>local attraction site (aquarium?)</p>
        <p>map playground site (google maps, mapgenie style)</p>
        <p>spotify api site</p>
      */}
      <section>
        <h2 className="text-2xl mb-2">Project Highlights</h2>
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent className="-ml-1 transform-3d">
            <TooltipProvider delay={0}>
              {projects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <CarouselItem
                    key={project.name.replaceAll(" ", "_") + `-${index}`}
                    className="translate-z-0 basis-[55%] pl-1"
                  >
                    <Card className="carousel-item-content">
                      <CardHeader>
                        <CardTitle className="text-3xl">
                          {project.name}
                        </CardTitle>
                        <CardDescription>Color Converter</CardDescription>

                        <CardAction>
                          {project.link && (
                            <div className="flex items-start">
                              {project.link.external ? (
                                <a
                                  href={project.link.url}
                                  className={buttonVariants({
                                    variant: "default",
                                  })}
                                >
                                  Live Demo
                                </a>
                              ) : (
                                <Link
                                  href={project.link.url}
                                  className={buttonVariants({
                                    variant: "default",
                                  })}
                                >
                                  Live Demo
                                </Link>
                              )}
                            </div>
                          )}
                        </CardAction>
                      </CardHeader>
                      <CardContent>
                        <Image
                          width={300}
                          height={200}
                          alt={project.name}
                          src={project.image}
                        />
                        {project.description}
                      </CardContent>
                      <CardFooter>
                        {project.tools.length > 0 && (
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">
                              Built with
                            </p>
                            <ul className="flex gap-3 justify-center">
                              {project.tools.map((tool) => (
                                <li key={tool.title}>
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
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
            </TooltipProvider>
          </CarouselContent>
          <div className="flex flex-col items-center gap-y-2">
            <div className="relative flex gap-x-4 justify-center mt-4">
              <CarouselPrevious className="relative top-0 left-0 right-0" />
              <CarouselNext className="relative top-0 left-0 right-0" />
            </div>
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/projects"
            >
              See All Projects
            </Link>
          </div>
        </Carousel>
      </section>

      {/* Blog Links */}
      <section>
        <h2 className="text-2xl mb-2">Latest Posts</h2>
        <ul className="space-y-0.5">
          {allBlogs.map((post) => (
            <li key={post.slug} className="odd:bg-accent hover:bg-inherit">
              <Link
                href={`/blog/${post.slug}`}
                className="block p-3 transition-all hover:ring-2 ring-muted-foreground"
              >
                <div className="flex flex-col md:flex-row items-baseline gap-x-2">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {post.publishedAt} | {post.readingTime}
                  </p>
                </div>
                <p>{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className={cn(buttonVariants({ variant: "default" }), "mt-4")}
          href="/blog"
        >
          See All Posts
        </Link>
      </section>

      <section>
        <SpotifyWidget />
      </section>

      {/* Tech Stack Info */}
      <section>
        <h2 className="text-2xl mb-2">Technologies I&apos;ve used</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10">
          {tools.map((t) => (
            <li key={t.title}>
              <StackHighlight
                image={t.image}
                altText={t.altText}
                title={t.title}
                subtitle={t.subtitle}
                url={t.url}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

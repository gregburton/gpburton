import { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import StackHighlight from "@/components/stack-highlight";
import tools from "@/lib/tools";

export const metadata: Metadata = {
  title: "Home | gpburton",
  description:
    "Welcome to my portfolio. Browse through my projects or read my blog to learn more about my experience as a web developer.",
};

export default function Home() {
  return (
    <main className="container mt-5 mb-20 flex flex-col gap-14">
      {/* Project Highlights */}
      <div>
        <h3 className="text-2xl mb-2">Stuff I&apos;ve built</h3>
        <p>small business site (get a quote)</p>
        <p>medium business site (multiple locations)</p>
        <p>record keeping site (employees, students)</p>
        <p>restaurant site</p>
        <p>state park site</p>
        <p>local attraction site (aquarium?)</p>
        <p>map playground site (google maps, mapgenie style)</p>
        <p>spotify api site</p>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/projects"
        >
          See All Projects
        </Link>
      </div>

      {/* Blog Links */}
      <div>
        <h3 className="text-2xl mb-2">...Blog stuff...</h3>
        <Link className={buttonVariants({ variant: "default" })} href="/blog">
          See All Posts
        </Link>
      </div>

      {/* Tech Stack Info */}
      <div>
        <h3 className="text-2xl mb-2">Stuff I use(d)</h3>
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
      </div>
    </main>
  );
}

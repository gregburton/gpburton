import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { getAllPosts } from "@/lib/blog-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// MDX has been achieved thanks to:
// https://devstacked.tech/blog/next-mdx-remote-client-nextjs-16-guide

export const metadata: Metadata = {
  title: "Blog | gpburton",
  description: "A journal of sorts.",
};

export default function BlogPage() {
  const allBlogs = getAllPosts();

  return (
    <main className="container mt-5 mb-10 flex flex-col gap-14">
      <h1 className="text-4xl">Blog</h1>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {allBlogs.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="transition-all bg-accent hover:bg-inherit"
            >
              <Card className="bg-inherit border-2 rounded-md flex pt-0">
                <div className="h-40 relative">
                  <Image
                    src={post.image_src}
                    alt={post.image_alt}
                    title={post.image_title}
                    loading="eager"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center rounded-l-md"
                  />
                </div>
                <div>
                  <CardHeader>
                    <CardTitle>
                      {post.title}{" "}
                      <span className="text-sm">- {post.readingTime}</span>
                    </CardTitle>
                    <CardDescription>{post.publishedAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.summary}</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

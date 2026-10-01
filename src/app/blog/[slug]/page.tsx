import { Suspense } from "react";
import Script from "next/script";
import { evaluate, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getSource } from "@/lib/blog-utils";
import { mdxComponents } from "@/components/mdx-components";
import ErrorComponent from "@/components/error-component";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

type Frontmatter = {
  author: string;
  title: string;
  publishedAt: string;
  summary: string;
  image_src: string;
  image_alt: string;
  image_title: string;
};

const mdxOptions: MDXRemoteOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

// Pre-renders every post at build time (Static Site Generation)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const source = await getSource(`${slug}.mdx`)!;

  if (!source) return <ErrorComponent error="The source could not found!" />;

  const { content, frontmatter, error } = await evaluate<Frontmatter>({
    source,
    options: mdxOptions,
    components: mdxComponents,
  });

  if (error) return <ErrorComponent error={error} />;

  return (
    <article className="mt-5 mb-20 prose dark:prose-invert mx-auto prose-code:before:content-none prose-code:after:content-none">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: frontmatter.title,
            description: frontmatter.summary,
            datePublished: frontmatter.publishedAt,
            author: { "@type": "Person", name: frontmatter.author },
          }),
        }}
      />
      <h1 className="my-1!">{frontmatter.title}</h1>
      <span>{frontmatter.publishedAt}</span>
      <Suspense fallback={<p>Loading post…</p>}>{content}</Suspense>
    </article>
  );
}

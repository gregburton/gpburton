import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import { getFrontmatter } from "next-mdx-remote-client/utils";

// MDX has been achieved thanks to:
// https://devstacked.tech/blog/next-mdx-remote-client-nextjs-16-guide

const POSTS_PATH = path.join(process.cwd(), "src/content/blogs");

export type Post = {
  author: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
  content: string;
  image_src: string;
  image_alt: string;
  image_title: string;
};

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_PATH);

  const posts = files.map((file) => {
    const filePath = path.join(POSTS_PATH, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { frontmatter, strippedSource: content } =
      getFrontmatter<Post>(fileContent);

    const slug = file.replace(/\.mdx$/, "");

    return {
      slug,
      author: frontmatter.author,
      title: frontmatter.title,
      summary: frontmatter.summary,
      publishedAt: frontmatter.publishedAt,
      updatedAt: frontmatter.updatedAt,
      image_src: frontmatter.image_src,
      image_alt: frontmatter.image_alt,
      image_title: frontmatter.image_title,
      tags: frontmatter.tags || [],
      readingTime: readingTime(content).text,
      content,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export const getSource = async (
  filename: string,
): Promise<string | undefined> => {
  const sourcePath = path.join(POSTS_PATH, filename);
  if (!fs.existsSync(sourcePath)) return;
  return await fs.promises.readFile(sourcePath, "utf8");
};

import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostSlugs() {
  return readdir(postsDirectory);
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getPostSlugs();
  const posts = (
    await Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)))
  )
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

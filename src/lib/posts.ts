import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export type Post<S, T> = {
  metadata: {
    id: string,
    title: string,
    date: S,
    summary: string,
    length: number
  }
  content: T
};

export const parse = async (filepath: string): Promise<Post<Date, string>> => {
  const file = path.parse(filepath);
  const data = await fs.promises.readFile(filepath);
  const post = matter(data);
  return {
    metadata: {
      id: file.name,
      title: post.data.title,
      date: post.data.date,
      summary: post.data.summary,
      length: readingTime(post.content),
    },
    content: post.content
  };
};

export const getPosts = async (directory: string): Promise<Post<Date, string>[]> => {
  const postFiles = await (async () => {
    try {
      const files = await fs.promises.readdir(directory);
      return files;
    } catch {
      return [];
    }
  })();
  const fullFiles = postFiles.map(fp => path.join(directory, fp));
  const posts = await Promise.all(fullFiles.map(parse));
  return posts.sort((x, y) => y.metadata.date.getTime() - x.metadata.date.getTime());
};

export const readingTime = (article: string): number =>
  Math.ceil(article.split(/\s/).length / 200);

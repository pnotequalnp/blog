import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export type Post<T> = {
  metadata: {
    id: string,
    title: string,
    date: string,
    summary: string,
    length: number
  }
  content: T
};

export const parse = async (filepath: string): Promise<Post<string>> => {
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

export const getPosts = async (directory: string): Promise<Post<string>[]> => {
  const postFiles = await fs.promises.readdir(directory);
  const fullFiles = postFiles.map(fp => path.join(directory, fp));
  return Promise.all(fullFiles.map(parse));
};

export const readingTime = (article: string): number =>
  Math.ceil(article.split(/\s/).length / 200);

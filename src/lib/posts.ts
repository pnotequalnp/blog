import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export type Post = {
  id: string,
  title: string,
  date: string,
  content: string
};

export const parse = async (filepath: string): Promise<Post> => {
  const file = path.parse(filepath);
  const data = await fs.promises.readFile(filepath);
  const post = matter(data);
  return {
    id: file.name,
    title: post.data.title,
    date: post.data.date,
    content: post.content
  };
};

export const getPosts = async (directory: string): Promise<Post[]> => {
  const postFiles = await fs.promises.readdir(directory);
  const fullFiles = postFiles.map(fp => path.join(directory, fp));
  return Promise.all(fullFiles.map(parse));
};

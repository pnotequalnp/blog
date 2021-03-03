import type { FC } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Post } from '../../lib/posts';
import { getPosts } from '../../lib/posts';
import path from 'path';
import { useEffect } from 'react';
import { useRemark } from 'react-remark';

export type Props = {
  post: Post
};

export const BlogPost: FC<Props> = ({ post }) => {
  const [renderedContent, setContentSource] = useRemark();
  useEffect(() => setContentSource(post.content), []);

  return <>
    <h2>{post.title}</h2>
    <h3>{post.date}</h3>
    {renderedContent}
  </>;
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const postDir = path.join(process.cwd(), 'src', 'posts');
  const posts = await getPosts(postDir);
  const paths = posts.map(post => ({ params: { id: post.id } }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params === undefined) return { notFound: true };
  const posts = await getPosts(path.join(process.cwd(), '/src/posts'));
  const post = posts.find(post => post.id === params.id);
  if (post === undefined) return { notFound: true };
  return {
    props: { post }
  };
};

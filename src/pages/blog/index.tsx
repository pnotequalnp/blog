import type { FC } from 'react';
import type { GetStaticProps } from 'next'
import type { Post } from '../../lib/posts';
import { getPosts } from '../../lib/posts';
import path from 'path';
import PostPreview from '../../components/blog/PostPreview';
import { Card } from 'semantic-ui-react';
import Head from 'next/head';

export type Props = {
  posts: Post<string, any>[]
};

export const BlogIndex: FC<Props> = ({ posts }) => {
  const previews = posts.map(post => {
    const date = new Date(post.metadata.date);
    const parsedPost = { ...post, metadata: { ...post.metadata, date } };
    return <PostPreview key={post.metadata.id} {...parsedPost} />;
  });

  return <>
    <Head>
      <title>Kevin Mullins - Blog</title>
    </Head>
    <Card.Group content={previews} centered />
  </>;
};

export default BlogIndex;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const rawPosts = await getPosts(path.join(process.cwd(), '/src/posts'));
  const posts = rawPosts.map(post => {
    const metadata = {
      ...post.metadata,
      date: post.metadata.date.toJSON(),
    };

    return { ...post, metadata };
  });
  return {
    props: { posts }
  };
};

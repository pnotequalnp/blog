import type { FC } from 'react';
import type { GetStaticProps } from 'next'
import type { Post } from '../../lib/posts';
import { getPosts } from '../../lib/posts';
import path from 'path';
import PostPreview from '../../components/blog/PostPreview';
import { Card } from 'semantic-ui-react';
import Head from 'next/head';

export type Props = {
  posts: Post[]
};

export const BlogIndex: FC<Props> = ({ posts }) => {
  const previews = posts.map(post => <PostPreview key={post.id} post={post} />);

  return <>
    <Head>
      <title>Kevin Mullins - Blog</title>
    </Head>
    <Card.Group>{previews}</Card.Group>
  </>;
};

export default BlogIndex;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts(path.join(process.cwd(), '/src/posts'));
  return {
    props: { posts }
  };
};

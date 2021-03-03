import type { FC } from 'react';
import type { GetStaticProps } from 'next'
import type { Post } from '../../lib/posts';
import { getPosts } from '../../lib/posts';
import path from 'path';
import PostPreview from '../../components/blog/PostPreview';

export type Props = {
  posts: Post[]
};

export const BlogIndex: FC<Props> = ({ posts }) => {
  const previews = posts.map(post => <li key={post.id}><PostPreview post={post} /></li>);

  return <>
    <h2>Blog Index</h2>
    <ul>{previews}</ul>
  </>;
};

export default BlogIndex;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts(path.join(process.cwd(), '/src/posts'));
  return {
    props: { posts }
  };
};

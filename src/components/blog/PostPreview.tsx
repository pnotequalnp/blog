import type { FC } from 'react';
import type { Post } from '../../lib/posts';
import Link from 'next/link'

export type Props = {
  post: Post
};

export const PostPreview: FC<Props> = ({ post }) => {
  return <Link href={`/blog/${post.id}`}>
    <a>
      <h3>{post.title}</h3>
      <h4>{post.date}</h4>
    </a>
  </Link>;
};

export default PostPreview;

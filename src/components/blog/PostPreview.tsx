import type { FC } from 'react';
import type { Post } from '../../lib/posts';
import Link from 'next/link'
import { Card } from 'semantic-ui-react';

export type Props = {
  post: Post
};

export const PostPreview: FC<Props> = ({ post }) =>
  <Link href={`/blog/${post.id}`}>
    <Card>
      <Card.Content>
        <Card.Header>{post.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{post.date}</span>
        </Card.Meta>
        <Card.Description>{post.summary}</Card.Description>
      </Card.Content>
      <Card.Content extra>{post.length} minute read</Card.Content>
    </Card>
  </Link>;

export default PostPreview;

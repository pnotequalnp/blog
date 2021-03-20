import type { FC } from 'react';
import type { Post } from '../../lib/posts';
import Link from 'next/link'
import { Card } from 'semantic-ui-react';

export type Props = Post<Date, any>;

export const PostPreview: FC<Props> = ({ metadata }) =>
  <Link href={`/blog/${metadata.id}`}>
    <Card>
      <Card.Content>
        <Card.Header>{metadata.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{metadata.date.toLocaleDateString()}</span>
        </Card.Meta>
        <Card.Description>{metadata.summary}</Card.Description>
      </Card.Content>
      <Card.Content extra>{metadata.length} minute read</Card.Content>
    </Card>
  </Link>;

export default PostPreview;

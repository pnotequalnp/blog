import type { FC } from 'react';
import type { Repo } from '../lib/github';
import type { MdxRemote } from 'next-mdx-remote/types';
import { Card, Icon, /* Popup */ } from 'semantic-ui-react'
/* import hydrate from 'next-mdx-remote/hydrate'; */

export type Props = Repo<MdxRemote.Source | null>;

export const GitHubRepo: FC<Props> = ({ description, language, name, /* readme, */ stars, url }) => {
  const card = <Card
    href={url}
    header={name}
    meta={language}
    description={description}
    extra={<><Icon name='star' />{stars}</>}
  />

  // FIXME: Popup doesn't render properly
  /* if (readme) */
  /* return <Popup trigger={card}>{hydrate(readme)}</Popup>; */

  return card;
};

export default GitHubRepo;

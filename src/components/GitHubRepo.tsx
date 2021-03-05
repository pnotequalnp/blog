import type { FC } from 'react';
import type { Repo } from '../lib/github';
import { Card, Icon } from 'semantic-ui-react'

export type Props = {
  repo: Repo
};

export const GitHubRepo: FC<Props> = ({ repo }) =>
  <Card
    href={repo.url}
    header={repo.name}
    meta={repo.language}
    description={repo.description}
    extra={<><Icon name='star' />{repo.stars}</>}
  />;

export default GitHubRepo;

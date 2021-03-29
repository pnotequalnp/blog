import type { FC } from 'react';
import type { GetStaticProps } from 'next';
import type { MdxRemote } from 'next-mdx-remote/types';
import renderToString from 'next-mdx-remote/render-to-string';
import { Card, Container, Header } from 'semantic-ui-react'
import { pinnedRepos, Repo } from '../lib/github';
import GitHubRepo from '../components/GitHubRepo';

export type Props = {
  repos: Repo<MdxRemote.Source | null>[]
};

export const Home: FC<Props> = ({ repos }) => {
  const cards = repos.map(repo => <GitHubRepo key={repo.id} {...repo} />);

  return <>
    <Header id='name' as='h1' content='Kevin Mullins' />
    <Container as='section' style={{ flexGrow: 1 }}>
      <p style={{ fontSize: '1.4rem' }}>
        I am a software developer with an interest in the design and implementation of scalable
        and distributed software systems and the application of new and existing mathematical
        knowledge bases to the design and implementation of software and software development tools.
        I am currently a university undergraduate studying math and computer science.
      </p>
    </Container>
    <Container as='section'>
      <Header as='h1' content='Pinned GitHub Repos' textAlign='center' />
      <Card.Group content={cards} centered />
    </Container>
  </>
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const repoSources = await pinnedRepos('pnotequalnp');
  const repos = await Promise.all(repoSources.map(async repo => {
    const readme = repo.readme ? await renderToString(repo.readme ?? '') : null;
    return { ...repo, readme };
  }));
  return {
    props: { repos },
    revalidate: 60
  };
};

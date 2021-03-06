import type { FC } from 'react';
import type { GetStaticProps } from 'next'
import type { Repo } from '../lib/github';
import Head from 'next/head';
import { pinnedRepos } from '../lib/github';
import GitHubRepo from '../components/GitHubRepo';
import { Card, Container, Header } from 'semantic-ui-react'

export type Props = {
  repos: Repo[]
};

export const About: FC<Props> = ({ repos }) => {
  const cards = repos.map(repo => <GitHubRepo key={repo.id} repo={repo} />);
  return <>
    <Head>
      <title>Kevin Mullins - About</title>
    </Head>
    <Container as='section'>
      <Header as='h1' content='Pinned GitHub Repos' textAlign='center' />
      <Card.Group content={cards} centered />
    </Container>
  </>;
};

export default About;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const repos = await pinnedRepos('pnotequalnp');
  return {
    props: { repos },
    revalidate: 60
  };
};

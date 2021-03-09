import type { FC } from 'react';
import type { GetStaticProps } from 'next'
import type { Repo } from '../lib/github';
import type { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { pinnedRepos } from '../lib/github';
import GitHubRepo from '../components/GitHubRepo';
import { Card, Container, Header } from 'semantic-ui-react'
import renderToString from 'next-mdx-remote/render-to-string';

export type Props = {
  repos: Repo<MdxRemote.Source | null>[]
};

export const About: FC<Props> = ({ repos }) => {
  const cards = repos.map(repo => <GitHubRepo key={repo.id} {...repo} />);
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

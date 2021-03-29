import type { FC } from 'react';
import type { GetStaticProps } from 'next'
import type { Repo } from '../lib/github';
import type { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { pinnedRepos } from '../lib/github';
import GitHubRepo from '../components/GitHubRepo';
import { Card, Container, Divider, Header } from 'semantic-ui-react'
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
    <Container as='section' text>
      <Header as='h1' content='About Me' />
      <p>
        I am a university student studying math and computer science. I am a programmer by trade,
        and some of my work can be found on my GitHub which is linked below, along with my pinned
        repos. I am graduating in the near future and am looking for a position for when that
        happens.
      </p>
      <Header as='h2' content='Interests' />
      <p>
        One of my biggest interests is software architecture and engineering. I'm also interested in
        the implementation and application of statically typed purely functional programming
        langauges. Additionally I enjoy the application of math such as graph theory, category
        theory, type theory, and abstract algebra to solve difficult problems in programming. I
        also follow the world of security a little bit.
      </p>
      <Header as='h2' content='Technologies' />
      <p>
        I'm something of a polyglot, I am very comfortable working with a wide range of programming
        languages. The languages I enjoy writing the most are Haskell and Rust. I currently daily
        drive NixOS, a Linux distribution based on the Nix package manager, which is a purely
        functional package manager with deterministic and reproducible builds. I have worked with
        both MacOS and Windows in the past.
      </p>
      <Header as='h2' content='Other Interests' />
      <p>
        Outside the technical world, I am involved with music, like to cook, play chess, am learning
        French, and enjoy solving Rubik's cube style puzzles. You can find software on some of these
        topics that I've written on my GitHub.
      </p>
    </Container>
    <Divider section />
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

import type { FC } from 'react';
import Head from 'next/head';
import { Container, Header } from 'semantic-ui-react'

export const About: FC<{}> = () =>
  <>
    <Head>
      <title>Kevin Mullins - About</title>
    </Head>
    <Container as='section' text>
      <Header as='h1' content='About Me' />
      <p>
        I am a university undergraduate studying math and computer science.  One of my biggest
        interests is software architecture and engineering. I'm also interested in the
        implementation and application of statically typed purely functional programming langauges.
        Additionally I enjoy the application of math such as graph theory, category theory, type
        theory, and abstract algebra to solve difficult problems in programming. I also follow the
        world of security a little bit.
      </p>
      <Header as='h2' content='Experience' />
      <p>
        The summer of 2019 I interned for Aon IPS, the intellectual property division of the
        multinational professional insurance and risk-mitigation company. There I researched,
        designed, and implemented a system to aggregate data from various sources, construct and
        analyze large graphs to extract relevant domain-specific information using natural language
        processing techniques, and package that data to be consumed by other internal services.
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
  </>;

export default About;

import type { FC } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Post } from '../../lib/posts';
import type { MdxRemote } from 'next-mdx-remote/types';
import { getPosts } from '../../lib/posts';
import path from 'path';
import { Container, Header } from 'semantic-ui-react';
import Head from 'next/head';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import SyntaxHighlighter from 'react-syntax-highlighter';

const components: MdxRemote.Components = {
  SyntaxHighlighter
};

export type Props = Post<MdxRemote.Source>;

export const BlogPost: FC<Props> = ({ metadata, content }) =>
  <>
    <Head>
      <title>{metadata.title}</title>
    </Head>
    <Container textAlign='center'>
      <Header as='h1'>
        {metadata.title}
        <Header.Subheader>{metadata.date}</Header.Subheader>
        <Header.Subheader>{metadata.summary}</Header.Subheader>
      </Header>
      <Container text as='article' textAlign='left'>{hydrate(content, { components })}</Container>
    </Container>
  </>;

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const postDir = path.join(process.cwd(), 'src', 'posts');
  const posts = await getPosts(postDir);
  const paths = posts.map(post => ({ params: { id: post.metadata.id } }));
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params === undefined) return { notFound: true };
  const posts = await getPosts(path.join(process.cwd(), '/src/posts'));
  const postSource = posts.find(post => post.metadata.id === params.id);
  if (postSource === undefined) return { notFound: true };
  const content = await renderToString(postSource.content, { components });
  const post = { ...postSource, content };
  return {
    props: post
  };
};

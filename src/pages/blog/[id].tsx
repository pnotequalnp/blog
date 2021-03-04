import type { FC } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Post } from '../../lib/posts';
import { getPosts } from '../../lib/posts';
import path from 'path';
import { useEffect } from 'react';
import { useRemark } from 'react-remark';
import { Container, Header } from 'semantic-ui-react';
import Head from 'next/head';

export type Props = {
  post: Post
};

export const BlogPost: FC<Props> = ({ post }) => {
  const [renderedContent, setContentSource] = useRemark();
  useEffect(() => setContentSource(post.content), []);

  return <>
    <Head>
      <title>{post.title}</title>
    </Head>
    <Container textAlign='center'>
      <Header as='h1'>
        {post.title}
        <Header.Subheader>{post.date}</Header.Subheader>
        <Header.Subheader>{post.summary}</Header.Subheader>
      </Header>
      <Container text as='article' textAlign='left'>{renderedContent}</Container>
    </Container>
  </>;
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const postDir = path.join(process.cwd(), 'src', 'posts');
  const posts = await getPosts(postDir);
  const paths = posts.map(post => ({ params: { id: post.id } }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params === undefined) return { notFound: true };
  const posts = await getPosts(path.join(process.cwd(), '/src/posts'));
  const post = posts.find(post => post.id === params.id);
  if (post === undefined) return { notFound: true };
  return {
    props: { post }
  };
};

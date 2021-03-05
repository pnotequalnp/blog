import type { FC } from 'react';
import Link from 'next/link'
import { Container, Divider, Icon, List, Menu, Segment } from 'semantic-ui-react';

export const Layout: FC<{}> = ({ children }) => {
  return <>
    <Container as='header'>
      <Menu as='nav'>
        <Menu.Item name='home'><Link href='/'><a>Home</a></Link></Menu.Item>
        <Menu.Item name='blog'><Link href='/blog'><a>Blog</a></Link></Menu.Item>
        <Menu.Item name='about' position='right'><Link href='/about'><a>About</a></Link></Menu.Item>
      </Menu>
    </Container>
    <Divider section hidden />
    <Container as='main'>{children}</Container>
    <Segment as='footer' vertical>
      <Container textAlign='center'>
        <Divider section />
        <List horizontal divided link size='huge'>
          <List.Item as='a' href='https://github.com/pnotequalnp'>
            <Icon name='github' />
          </List.Item>
          <List.Item as='a' href='https://www.linkedin.com/in/pnotequalnp'>
            <Icon name='linkedin' />
          </List.Item>
          <List.Item as='a' href='https://twitter.com/pnotequalnp'>
            <Icon name='twitter' />
          </List.Item>
          <List.Item as='a' href='mailto:kevin@pnotequalnp.com'>
            <Icon name='mail' />
          </List.Item>
        </List>
        <Divider fitted hidden />
        <List horizontal divided link>
          <List.Item as='a' href='https://github.com/pnotequalnp/blog'>
            <Icon name='github' /> View on GitHub
          </List.Item>
          <List.Item as='a' href='https://vercel.com/'>
            Powered by Vercel
          </List.Item>
        </List>
      </Container>
    </Segment>
  </>
};

export default Layout;

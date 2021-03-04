import type { FC } from 'react';
import Link from 'next/link'
import { Container, Menu } from 'semantic-ui-react';

export const Layout: FC<{}> = ({ children }) => {
  return <>
    <Container as='header'>
      <Menu as='nav'>
        <Menu.Item name='home'><Link href='/'><a>Home</a></Link></Menu.Item>
        <Menu.Item name='blog'><Link href='/blog'><a>Blog</a></Link></Menu.Item>
      </Menu>
    </Container>
    <Container>{children}</Container>
    <Container as='footer'>
    </Container>
  </>
};

export default Layout;

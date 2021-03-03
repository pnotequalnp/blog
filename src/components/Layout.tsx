import type { FC } from 'react';
import Link from 'next/link'

export const Layout: FC<{}> = ({ children }) => {
  return <>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link>
        <Link href='/blog'><a>Blog</a></Link>
      </nav>
    </header>
    {children}
    <footer>
    </footer>
  </>
};

export default Layout;

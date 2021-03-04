import type { FC } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Router from 'next/router';
import nprogress from 'nprogress'

import 'semantic-ui-css/semantic.min.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => nprogress.start());
Router.events.on('routeChangeComplete', () => nprogress.done());
Router.events.on('routeChangeError', () => nprogress.done());

const App: FC<AppProps> = ({ Component, pageProps }) =>
  <Layout>
    <Component {...pageProps} />
  </Layout>

export default App;

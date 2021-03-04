import type { FC } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

import 'semantic-ui-css/semantic.min.css';

const App: FC<AppProps> = ({ Component, pageProps }) =>
  <Layout>
    <Component {...pageProps} />
  </Layout>

export default App;

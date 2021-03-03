import type { FC } from 'react';
import type { AppProps } from 'next/app';

const App: FC<AppProps> = ({ Component, pageProps }) =>
  <Component {...pageProps} />;

export default App;

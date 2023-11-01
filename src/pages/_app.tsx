import '@/styles/reset.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/common/layout';
import HomeHeader from '@/components/common/headers/home';

import type { NextPage } from 'next';
import { type ReactElement } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import { initMocks } from '@/mocks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithHeader) {
  const header = Component.Header ?? HomeHeader;

  initMocks();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Layout header={header}>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

type NextPageWithHeader<P = {}, IP = P> = NextPage<P, IP> & {
  Header?: () => ReactElement;
};

type AppPropsWithHeader = AppProps & {
  Component: NextPageWithHeader;
};

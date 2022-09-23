// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/shared/layout";
import "../styles/globals.css";;
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';

const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
    <WagmiConfig client={client}>
      <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;

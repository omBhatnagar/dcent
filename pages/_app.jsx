import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css'
import Layout from '../components/Layout'
const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp; 

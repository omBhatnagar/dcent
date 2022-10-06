// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/shared/layout";
import "../styles/globals.css";
import { WagmiConfig, createClient, allChains } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import AppContext from "../context/AppContext";
import { useState } from "react";

const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
    chains: allChains,
  })
);

function MyApp({ Component, pageProps }) {
  const [chainId, setChainId] = useState("0x1");
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <ChakraProvider>
          <AppContext.Provider
            value={{
              state: {
                chainId,
              },
              setChainId,
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppContext.Provider>
        </ChakraProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

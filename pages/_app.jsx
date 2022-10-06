// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/shared/layout";
import "../styles/globals.css";
import { WagmiConfig, createClient, allChains } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
	getDefaultClient({
		appName: "Your App Name",
		alchemyId,
		chains: allChains,
	}),
);

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider>
				<ChakraProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</ConnectKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;

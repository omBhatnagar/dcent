import { useContext, useEffect, useState } from "react";
import Moralis from "moralis";
import { Select } from "@chakra-ui/react";
import NftCard from "../components/nft-card";
import { useAccount } from "wagmi";
import AppContext from "../context/AppContext";

const Nfts = () => {
	const value = useContext(AppContext);
	const {
		state: { chainId },
	} = value;
	const [nfts, setNfts] = useState();

	console.log(value.state.chainId);
	const { address, isDisconnected } = useAccount();

	useEffect(() => {
		(async () => {
			await Moralis.start({
				apiKey: process.env.NEXT_PUBLIC_API_KEY,
			});
			if (address) {
				const response = await Moralis.EvmApi.nft.getWalletNFTs({
					address,
					chain: chainId,
				});
				console.log(response.data.result);
				setNfts(
					response.data.result.map((item) => {
						return JSON.parse(item.metadata);
					}),
				);
			}
		})();
	}, [address, chainId]);

	return (
		<>
			<div className='flex flex-wrap justify-between items-center gap-y-12 bg-background-dark px-6'>
				{isDisconnected && (
					<div className='flex justify-center text-2xl text-bold h-[100vh] text-white items-center w-full'>
						Please Connect Your Wallet
					</div>
				)}
				{nfts?.map((nft) => {
					const image =
						nft.image.substring(0, 4) == "ipfs"
							? "https://ipfs.io/" + nft.image
							: nft.image;
					return (
						<NftCard
							key={nft.hash}
							name={nft.name}
							description={nft.description}
							image={image}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Nfts;

import { useEffect, useState } from "react";
import Moralis from "moralis";
import { Select } from "@chakra-ui/react";
import NftCard from "../components/nft-card";
import { useAccount } from "wagmi";

const Nfts = () => {
	const [chain, setChain] = useState("0x1");
	const [nfts, setNfts] = useState();

	const { address, isDisconnected } = useAccount();

	useEffect(() => {
		(async () => {
			await Moralis.start({
				apiKey: process.env.NEXT_PUBLIC_API_KEY,
			});
			if (address) {
				const response = await Moralis.EvmApi.nft.getWalletNFTs({
					address,
					chain,
				});
				console.log(response.data.result);
				setNfts(
					response.data.result.map((item) => {
						return JSON.parse(item.metadata);
					}),
				);
			}
		})();
	}, [address, chain]);

	return (
		<>
			<div className='w-1/4 px-3 py-6'>
				<Select
					focusBorderColor='white'
					bg='white'
					borderColor='white'
					placeholder='Select Chain'
					value={chain}
					onChange={(e) => setChain(e.target.value)}
				>
					<option value='0x1'>Ethereum Mainnet</option>
					<option value='0x3'>Ropsten</option>
					<option value='0x4'>Rinkeby</option>
					<option value='0x89'>Polygon</option>
					<option value='0x86a'>Avalanche</option>
				</Select>
			</div>
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

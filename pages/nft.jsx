import { useContext, useEffect, useState } from "react";
import Moralis from "moralis";
import NftCard from "../components/nft-card";
import { useAccount } from "wagmi";
import AppContext from "../context/AppContext";

const Nfts = () => {
	const value = useContext(AppContext);
	const {
		state: { chainId },
	} = value;
	const [nfts, setNfts] = useState();
	const { address, isDisconnected } = useAccount();

	const onMintHandler = async () => {
		const data = {
			walletAddress: address,
		};

		await fetch("/api/mintNFT", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
	};

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
			{/* {address && (
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
					onClick={onMintHandler}
				>
					Mint a DCent NFT!
				</button>
			)} */}
			<div className='flex flex-wrap justify-between items-center gap-y-12 bg-background-dark px-6'>
				{isDisconnected && (
					<div className='flex justify-center text-2xl text-bold h-[100vh] text-white items-center w-full'>
						Please Connect Your Wallet
					</div>
				)}
				{nfts?.map((nft) => {
					console.log(nft.image);
					const image =
						nft.image instanceof String
							? nft.image.substring(0, 4) == "ipfs"
								? "https://ipfs.io/" + nft.image
								: nft.image
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

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
	const [loading, setLoading] = useState(false);
	const { address, isDisconnected } = useAccount();

	const onMintHandler = async () => {
		const data = {
			walletAddress: address,
		};
		setLoading(true);
		await fetch("/api/mintNFT", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
		setLoading(false);
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
					response.data?.result
						.filter((item) => !!item.metadata)
						.map((item) => {
							return JSON.parse(item.metadata);
						}),
				);
			}
		})();
	}, [address, chainId]);

	return (
		<>
			{isDisconnected ? (
				<div className='flex justify-center text-2xl text-bold h-[100vh] text-white items-center w-full'>
					Please Connect Your Wallet
				</div>
			) : (
				<div>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-6'
						onClick={onMintHandler}
					>
						{`${loading ? "Minting..." : "Mint a DCent NFT!"}`}
					</button>

					<div className='flex flex-wrap justify-around items-center gap-y-12 px-6'>
						{nfts?.map((nft) => {
							console.log(nft.image, typeof nft.image);
							const image =
								typeof nft.image === "string"
									? nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")
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
				</div>
			)}
		</>
	);
};

export default Nfts;

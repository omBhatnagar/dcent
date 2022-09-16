import { useEffect, useState } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import Image from "next/image";

const address = "0x91417d13cfDa2D1Ac6860f825ad964eA8E4343f8";

const chain = EvmChain.RINKEBY;

const Nfts = () => {
	const [nfts, setNfts] = useState();

	useEffect(() => {
		(async () => {
			await Moralis.start({
				apiKey:
					"VSrOoiuUp303vcqi8Od52Pg8kcZFhOKCBf3SfHP7eQYGl7GN2dfw4mbxoJCYvZAA",
				// ...and any other configuration
			});

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
		})();
	}, []);

	return (
		<div className='flex flex-wrap justify-between items-center gap-y-12'>
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
	);
};

const NftCard = ({ name, description, image }) => {
	return (
		<div className='max-w-sm rounded-lg border shadow-md bg-gray-800 border-gray-700'>
			<img className='rounded-t-lg' src={image} alt='nft-image' />
			<div className='p-5'>
				<h5 className='mb-2 text-2xl font-bold tracking-tight text-white'>
					{name}
				</h5>
				<p className='mb-3 font-normal text-gray-400'>{description}</p>
				<a
					href='#'
					className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 bg-blue-700 focus:ring-blue-800'
				>
					Read more
					<svg
						aria-hidden='true'
						className='ml-2 -mr-1 w-4 h-4'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
							clipRule='evenodd'
						></path>
					</svg>
				</a>
			</div>
		</div>
	);
};

export default Nfts;

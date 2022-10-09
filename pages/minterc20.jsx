import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Minterc20 = () => {
	const { address, isDisconnected } = useAccount();

	const [loading, setLoading] = useState(false);
	const [amount, setAmount] = useState(10);

	const onMintHandler = async () => {
		const data = {
			address,
			amount,
		};
		setLoading(true);
		const response = await fetch("/api/mintERC20", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
		setLoading(false);
		console.log(response);
	};

	useEffect(() => {
		(async () => {
			const data = {
				address,
			};

			const response = await fetch("/api/getDcentERC20", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const balance = await response.json();
			console.log("BALANCE", balance);
		})();
	}, [address]);

	return (
		<div>
			{isDisconnected ? (
				<div className='flex justify-center text-2xl text-bold h-[100vh] text-white items-center w-full'>
					Please Connect Your Wallet
				</div>
			) : (
				<div>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
						onClick={onMintHandler}
					>
						{`${loading ? "Minting..." : "Mint DCent tokens!"}`}
					</button>
				</div>
			)}
		</div>
	);
};

export default Minterc20;

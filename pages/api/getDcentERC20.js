import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const PRIVATE_KEY = process.env.ENV_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

export default async function getDcentERC20(req, res) {
	const { address, amount } = req.body;

	const rpcUrl = "https://rpc-mumbai.maticvigil.com/";

	const wallet = new ethers.Wallet(
		PRIVATE_KEY,
		ethers.getDefaultProvider(rpcUrl),
	);
	const sdk = new ThirdwebSDK(wallet);
	const contract = await sdk.getContract(CONTRACT_ADDRESS);

	try {
		const balance = await contract.erc20.balanceOf(address);
		return res.status(201).send({
			status: true,
			code: 201,
			data: balance,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			error: err,
		});
	}
}

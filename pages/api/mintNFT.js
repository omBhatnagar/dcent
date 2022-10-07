import { ethers } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";
import fs from "fs";
import dcentNFT from "../../public/dcentNFT.jpg";

const PRIVATE_KEY = process.env.ENV_KEY;
const MODULE_ADDRESS = process.env.MODULE_ADDRESS;

export default async function mintNFT(req, res) {
	// The wallet address you'd like to mint to
	const { walletAddress } = req.body;

	// Use the network you created the initial project on
	const rpcUrl = "https://rpc-mumbai.maticvigil.com/";

	const wallet = new ethers.Wallet(
		PRIVATE_KEY,
		ethers.getDefaultProvider(rpcUrl),
	);
	const sdk = new ThirdwebSDK(wallet);
	const theModule = sdk.getNFTModule(MODULE_ADDRESS);
	// const image = fs.readFileSync("../../public/dcentNFT.jpg");
	const nftData = {
		name: "DCent",
		description: "A decent NFT.",
		image: dcentNFT,
	};
	try {
		await theModule.mintTo(walletAddress, nftData);
		res.status(200).end();
	} catch (error) {
		console.log(error);
		res.json(error);
		res.status(500).end();
	}
}

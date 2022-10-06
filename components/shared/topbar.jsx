import { Select } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";

const Topbar = () => {
	const [chain, setChain] = useState("0x1");
	const value = useContext(AppContext);
	const {
		state: { chainId },
		setChainId,
	} = value;

	return (
		<div className='w-full flex justify-end gap-4 py-3 pr-6'>
			<div className='w-60'>
				<Select
					focusBorderColor='white'
					bg='white'
					borderColor='white'
					placeholder='Select Chain'
					value={chainId}
					onChange={(e) => setChainId(e.target.value)}
				>
					<option value='0x1'>Ethereum Mainnet</option>
					<option value='0x3'>Ropsten</option>
					<option value='0x4'>Rinkeby</option>
					<option value='0x5'>Goerli</option>
					<option value='0x89'>Polygon</option>
					<option value='0xa869'>Avalanche</option>
					<option value='0x13881'>Mumbai Testnet</option>
				</Select>
			</div>
			<ConnectKitButton>
				{({ isConnected, isConnecting, show, hide, address, ensName }) => {
					return (
						<div
							onClick={show}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
						>
							{isConnected ? address : "Custom Connect"}
						</div>
					);
				}}
			</ConnectKitButton>
		</div>
	);
};

export default Topbar;

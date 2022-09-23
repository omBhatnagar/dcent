import { ConnectKitButton } from "connectkit";

const Topbar = () => {
	return (
		<div className='w-full flex justify-end py-3 pr-6'>
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

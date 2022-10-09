import { Select } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import AppContext from "../../context/AppContext";
import { chains } from "../../utils/chains";

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const value = useContext(AppContext);
  const {
    state: { chainId },
    setChainId,
  } = value;

  return (
    <div className="w-full flex justify-between lg:justify-end py-3 pr-6">
      <div
        className="block lg:hidden ml-4 text-2xl cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <BiMenu />
      </div>
      <div className="flex gap-4">
        <div className="w-60">
          <Select
            focusBorderColor="white"
            bg="white"
            borderColor="white"
            placeholder="Select Chain"
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
          >
            {chains?.length > 0 &&
              chains?.map(({ chainId, chainName }) => (
                <option value={chainId}>{chainName}</option>
              ))}
          </Select>
        </div>
        <ConnectKitButton>
          {({ isConnected, isConnecting, show, hide, address, ensName }) => {
            return (
              <div
                onClick={show}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                {isConnected ? address : "Custom Connect"}
              </div>
            );
          }}
        </ConnectKitButton>
      </div>
    </div>
  );
};

export default Topbar;

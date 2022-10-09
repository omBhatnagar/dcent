import { ethers } from "ethers";

export const weiToEth = (wei) => {
  return ethers.utils.formatEther(wei);
};

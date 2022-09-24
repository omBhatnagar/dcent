import { ethers } from "ethers";

export const weiToEth = (str) => {
    let eth = ethers.utils.formatEther(str);
    return eth;
}
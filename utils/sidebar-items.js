import { BsWallet2 } from "react-icons/bs";
import { TbCurrencyDogecoin } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { BiFace } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";

export const SidebarItems = [
  {
    id: 0,
    title: "Home",
    icon: <AiOutlineHome />,
    path: "/",
  },
  {
    id: 1,
    title: "NFTs",
    icon: <BiFace />,
    path: "/nft",
  },
  {
    id: 3,
    title: "Transactions",
    icon: <GrTransaction />,
    path: "/transactions",
  },
  {
    id: 4,
    title: "ERC20",
    icon: <TbCurrencyDogecoin />,
    path: "/balances/erc20",
  },
  {
    id: 5,
    title: "Wallet",
    icon: <BsWallet2 />,
    path: "/wallet",
  },
];

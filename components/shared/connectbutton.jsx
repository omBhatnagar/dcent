import { InjectedConnector } from "wagmi/connectors/injected";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import apiPost from "../utils/apiPost";
import { getEllipsisTxt } from "../utils/format";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
  Avatar,
  Text,
} from "@chakra-ui/react";
import metamask from "../assets/MetaMask.png";
import coinbase from "../assets/coinbase.png";
import walletconnect from "../assets/walletconnect.png";
import Image from "next/image";

const wallets = [
  {
    name: "Meta Mask",
    icon: metamask,
    handle: "meta",
  },
  {
    name: "WalletConnect",
    icon: walletconnect,
    handle: "wallet",
  },
  {
    name: "CoinBaseWallet",
    icon: coinbase,
    handle: "coin",
  },
];

const ConnectButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data } = useSession();

  const handleAuth = async (wal) => {
    if (isConnected) {
      await disconnectAsync();
    }
    try {
      const { account, chain } = await connectAsync();

      const userData = { network: "evm" };

      if (wal === "meta") {
        const { account, chain } = await connectAsync({
          connector: new MetaMaskConnector(),
        });
        userData.address = account;
        userData.chain = chain.id;
      }
      if (wal === "wallet") {
        const { account, chain } = await connectAsync({
          connector: new WalletConnectConnector({ options: { qrcode: true } }),
        });
        userData.address = account;
        userData.chain = chain.id;
      }
      if (wal === "coin") {
        const { account, chain } = await connectAsync({
          connector: new CoinbaseWalletConnector({
            options: {
              appName: "decent",
            },
          }),
        });
        userData.address = account;
        userData.chain = chain.id;
      }

      const { message } = await apiPost("/auth/request-message", userData);

      const signature = await signMessageAsync({ message });

      await signIn("credentials", { message, signature, callbackUrl: "/" });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: "/" });
  };

  if (data?.user) {
    return (
      <HStack onClick={handleDisconnect} cursor={"pointer"}>
        <Avatar size="xs" />
        <Text fontWeight="medium">{getEllipsisTxt(data.user.address)}</Text>
      </HStack>
    );
  }

  return (
    <>
      <Button onClick={onOpen}>Connect Wallet</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody className="flex flex-col items-center gap-5 mb-5">
            <h2 className="font-bold text-2xl mb-5 mt-2">
              Web3 Authentication
            </h2>
            {wallets.map((wallet) => (
              <button
                key={wallet.handle}
                className="bg-gray-300 w-full p-4 rounded-2xl font-semibold flex items-center justify-center text-xl gap-24"
                onClick={() => handleAuth(`${wallet.handle}`)}
              >
                <Image src={wallet.icon} height={30} width={30} /> {wallet.name}
              </button>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectButton;

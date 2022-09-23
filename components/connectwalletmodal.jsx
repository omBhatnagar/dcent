import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import {CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import {WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import metamask from '../assets/MetaMask.png';
import coinbase from '../assets/coinbase.png';
import walletconnect from '../assets/walletconnect.png';



const wallets = [
    {
      name: 'Meta Mask',
      icon: metamask,
      handle: "meta"
    },
    {
      name: 'WalletConnect',
      icon: walletconnect,
      handle: "wallet"
    },
    {
      name: 'CoinBaseWallet',
      icon: coinbase,
      handle: "coin"
    },
  ]

const ConnectWalletModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();

    const handleAuth = async (wal) => {
      if (isConnected) {
          await disconnectAsync();
      }

      const userData = {network: 'evm'};

      if(wal === "meta"){
          const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });
          userData.address = account;
          userData.chain = chain.id;
      }
      if(wal === "wallet"){
          const { account, chain } = await connectAsync({ connector: new WalletConnectConnector({options: {qrcode: true}}) });
          userData.address = account;
          userData.chain = chain.id;
      }
      if(wal === "coin"){
          const { account, chain } = await connectAsync({ connector: new CoinbaseWalletConnector({options: {
              appName: "decent"
          }}) });
          userData.address = account;
          userData.chain = chain.id;
      }



      const { data } = await axios.post('/api/auth/request-message', userData, {
          headers: {
              'content-type': 'application/json',
          },
      });

      const message = data.message;

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const { url } = await signIn('credentials', { message, signature, redirect: false, callbackUrl: '/' });
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url);
  };
  return (
    <>
    <Button onClick={onOpen}>Connect Wallet</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody className='flex flex-col items-center gap-5 mb-5'>
            <h2 className='font-bold text-2xl mb-5 mt-2'>Web3 Authentication</h2>
            {/* <button className='bg-gray-300 p-4 rounded-2xl font-semibold' onClick={() => handleAuth("meta")}><Image src={} /> Metamask</button>
            <button className='bg-gray-300 p-4 rounded-2xl font-semibold' onClick={() => handleAuth("wallet")}><Image src={} /> WalletConnect</button>
            <button className='bg-gray-300 p-4 rounded-2xl font-semibold' onClick={() => handleAuth("coin")}><Image src={} /> CoinbaseWallet</button> */}
            {wallets.map(wallet => (
              <button key={wallet.handle} className='bg-gray-300 w-full p-4 rounded-2xl font-semibold flex items-center justify-center text-xl gap-24' onClick={() => handleAuth(`${wallet.handle}`)}><Image src={wallet.icon} height={30} width={30}/> {wallet.name}</button>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
        </>
  )
}

export default ConnectWalletModal
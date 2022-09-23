import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import {CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import {WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import axios from 'axios';

function SignIn() {
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
        <div>
            <h3>Web3 Authentication</h3>
            <button onClick={() => handleAuth("meta")}>Authenticate via Metamask</button>
            <br />
            <button onClick={() => handleAuth("wallet")}>Authenticate via WalletConnect</button>
            <br />
            <button onClick={() => handleAuth("coin")}>Authenticate via CoinbaseWallet</button>
        </div>
    );
}

export default SignIn;
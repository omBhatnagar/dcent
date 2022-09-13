import Moralis from 'moralis';

export default async function handler(req, res) {
    // reads the api key from .env.local and starts Moralis SDK
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    const address = "0xABf3656c9AD45800171D582b83929B00C7F32b49";

    // Promise.all() for receiving data async from two endpoints
    const [nativeBalance, tokenBalances] = await Promise.all([
        Moralis.EvmApi.balance.getNativeBalance({ address }),
        Moralis.EvmApi.token.getWalletTokenBalances({ address }),
    ]);
    res.status(200).json({
        // formatting the output
        nativeBalance: nativeBalance.result.balance.ether,
        tokenBalances: tokenBalances.result.map((token) => token.display()),
    });
}
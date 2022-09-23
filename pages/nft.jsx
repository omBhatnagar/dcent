import { useEffect, useState } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import NftCard from "../components/nft-card";

const address = "0x91417d13cfDa2D1Ac6860f825ad964eA8E4343f8";

const chain = EvmChain.RINKEBY;

const Nfts = () => {
  const [nfts, setNfts] = useState();

  useEffect(() => {
    (async () => {
      await Moralis.start({
        apiKey:
          "VSrOoiuUp303vcqi8Od52Pg8kcZFhOKCBf3SfHP7eQYGl7GN2dfw4mbxoJCYvZAA",
        // ...and any other configuration
      });

      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      });
      console.log(response.data.result);
      setNfts(
        response.data.result.map((item) => {
          return JSON.parse(item.metadata);
        })
      );
    })();
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center gap-y-12">
      {nfts?.map((nft) => {
        const image =
          nft.image.substring(0, 4) == "ipfs"
            ? "https://ipfs.io/" + nft.image
            : nft.image;
        return (
          <NftCard
            key={nft.hash}
            name={nft.name}
            description={nft.description}
            image={image}
          />
        );
      })}
    </div>
  );
};

export default Nfts;

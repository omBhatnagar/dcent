import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const Minterc20 = () => {
  const { address, isDisconnected } = useAccount();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(10);
  const [balance, setBalance] = useState(0);

  const onMintHandler = async () => {
    const data = {
      address,
      amount: parseInt(amount),
    };
    setLoading(true);
    const response = await fetch("/api/mintERC20", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setLoading(false);
    console.log(response);
  };

  useEffect(() => {
    (async () => {
      const data = {
        address,
      };
      const response = await fetch("/api/getDcentERC20", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const _balance = await response.json();
      console.log(_balance);
      setBalance(_balance.data.displayValue);
    })();
  }, [address]);

  return (
    <div>
      {isDisconnected ? (
        <div className="flex justify-center text-2xl text-bold h-[100vh] text-white items-center w-full">
          Please Connect Your Wallet
        </div>
      ) : (
        <>
          <div className="text-gray-400">(The upper limit is 100)</div>
          <NumberInput
            defaultValue={10}
            min={1}
            max={100}
            value={amount}
            onChange={(numVal) => setAmount(numVal)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={onMintHandler}
            >
              {`${loading ? "Minting..." : "Mint DCent tokens!"}`}
            </button>
          </div>
          <div>
            <h2>Your DCent balance is: {balance} DCT</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Minterc20;

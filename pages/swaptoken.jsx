import Moralis from "moralis";
import axios from "axios";
import {weiToEth} from '../utils/weiToEth'
import { useState } from "react";
import { useSendTransaction } from "wagmi";

// gets a prop from getServerSideProps
function SwapToken({ balance }) {
    const [fromToken] = useState("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
    const [toToken, setToToken] = useState("0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa");
    const [value, setValue] = useState("1000000000000000000");
    const [valueExchanged, setValueExchanged] = useState("");
    const [valueExchangedDecimals, setValueExchangedDecimals] = useState(1E18);
    const [to, setTo] = useState("");
    const [txData, setTxData] = useState("");

    const address = `0xABf3656c9AD45800171D582b83929B00C7F32b49`

    const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
      request: {
          from: address,
          to: String(to),
          data: String(txData),
          value: String(value),
      },
})


  function changeToToken(e){
    setToToken(e.target.value);
    setValueExchanged("");
  }

  function changeValue(e){
    setValue(e.target.value * 1E18);
    setValueExchanged("");
  }

  async function get1inchSwap(){
    const tx = await axios.get(`https://api.1inch.io/v4.0/137/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${value}&fromAddress=${user.address}&slippage=5`);    
    console.log(tx.data)
    setTo(tx.data.tx.to);
    setTxData(tx.data.tx.data);
    setValueExchangedDecimals(Number(`1E${tx.data.toToken.decimals}`));
    setValueExchanged(tx.data.toTokenAmount);
  }

    return (
        <div>
            <div>User: {address}</div>
            <div>Your Eth balance: { parseFloat(weiToEth(balance.balance)).toFixed(3 )}</div>
            <select>
        <option value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">
          MATIC
        </option>
      </select>
      <input
        onChange={(e) => changeValue(e)}
        value={value / 1e18}
        type="number"
        min={0}
        max={balance.balance / 1e18}
      ></input>
      <br />
      <br />
      <select name="toToken" value={toToken} onChange={(e) => changeToToken(e)}>
        <option value="0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa">WETH</option>
        {/* <option value="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174">USDC</option> */}
      </select>
      <input
        value={
          !valueExchanged
            ? ""
            : (valueExchanged / valueExchangedDecimals).toFixed(5)
        }
        disabled={true}
      ></input>
      <br />
      <br />
      <button onClick={get1inchSwap}>Get Conversion</button>
      <button disabled={!valueExchanged} onClick={sendTransaction}>Swap Tokens</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      <br />
      <br />
         </div>
    );
}

export async function getServerSideProps() {
    
    await Moralis.start({ apiKey:'VSrOoiuUp303vcqi8Od52Pg8kcZFhOKCBf3SfHP7eQYGl7GN2dfw4mbxoJCYvZAA'})

    const response = await Moralis.EvmApi.account.getNativeBalance({
        address: '0xABf3656c9AD45800171D582b83929B00C7F32b49',
        chain: 0x13881,

        
    })

    return {
        props: { balance: response.raw },
    };

}

export default SwapToken;
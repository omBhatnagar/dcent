import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Heading,
  Box,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Moralis from "moralis";
import { getEllipsisTxt } from "../../utils/getEllipsisTxt";
import { weiToEth } from "../../utils/weiToEth";
import AppContext from "../../context/AppContext";
import { useAccount } from "wagmi";

const ERC20Balances = () => {
  const [ERC20, setERC20] = useState();
  const [error, setError] = useState("");
  const value = useContext(AppContext);
  const {
    state: { chainId },
  } = value;
  console.log(value.state.chainId);
  const { address, isDisconnected } = useAccount();

  useEffect(() => {
    (async () => {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      });

      try {
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
          address,
          chain: chainId,
          limit: 10,
        });
        setERC20(response.data);
        console.log(response.data.result);
        setError("");
      } catch (error) {
        console.log("Error: ", error.message);
        setTransactions("");
        setError(error.message);
      }
    })();
  }, [chainId, address]);

  return (
    <>
      <Heading size="lg" marginBottom={6} marginTop={10}>
        ERC20Balances
      </Heading>
      {isDisconnected && (
        <div className="flex justify-center text-2xl text-bold h-[100vh] text-white items-center w-full">
          Please Connect Your Wallet
        </div>
      )}
      {ERC20?.length ? (
        <Box
          border="2px"
          borderColor={"gray.300"}
          borderRadius="xl"
          padding="24px 18px"
        >
          <TableContainer w={"full"}>
            <Table variant="striped" className="bg-gray-200">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Symbol</Th>
                  <Th>Balance</Th>
                  <Th>Token Address </Th>
                  <Th isNumeric>Decimal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {ERC20?.map((tx, index) => (
                  <Tr key={index} cursor="pointer">
                    <Td>{tx?.name}</Td>
                    <Td>{tx?.symbol}</Td>
                    <Td>{weiToEth(tx?.balance)}</Td>
                    <Td>{getEllipsisTxt(tx?.token_address || "")}</Td>
                    <Td isNumeric>{tx.decimals}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Name</Th>
                  <Th>Symbol</Th>
                  <Th>Balance</Th>
                  <Th>Token Address </Th>
                  <Th isNumeric>Decimal</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <>
          {!error ? (
            <div>Looks Like you do not have any ERC20 tokens</div>
            ) : (
            <Box>{error}</Box>
          )} 
        </>
      )}
    </>
  );
};

export default ERC20Balances;

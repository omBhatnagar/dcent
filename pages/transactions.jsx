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
import { getEllipsisTxt } from "../utils/getEllipsisTxt";
import AppContext from "../context/AppContext";
import { useAccount } from "wagmi";

const transactions = () => {
  const [transactions, setTransactions] = useState();
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
        const response = await Moralis.EvmApi.transaction.getWalletTransactions(
          {
            address,
            chain: chainId,
          }
        );
        setTransactions(response.data.result);
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
        Transactions
      </Heading>
      {isDisconnected && (
        <div className="flex justify-center text-2xl text-bold h-[100vh] text-white items-center w-full">
          Please Connect Your Wallet
        </div>
      )}
      {transactions?.length ? (
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
                  <Th>Hash</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Gas used</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions?.map((tx) => (
                  <Tr key={tx?.hash} cursor="pointer">
                    <Td>{getEllipsisTxt(tx?.hash || "")}</Td>
                    <Td>{getEllipsisTxt(tx?.from_address || "")}</Td>
                    <Td>{getEllipsisTxt(tx?.to_address || "")}</Td>
                    <Td>{tx.gas}</Td>
                    <Td>{new Date(tx.block_timestamp).toLocaleDateString()}</Td>
                    <Td isNumeric>{tx.receipt_status}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Hash</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Gas used</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Status</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <>
          {!error ? (
            <div>Looks Like you do not have any transactions</div>
          ) : (
            <Box>{error}</Box>
          )}
        </>
      )}
    </>
  );
};

export default transactions;

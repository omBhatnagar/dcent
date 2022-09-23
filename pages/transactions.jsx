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
import React, { useEffect, useState } from "react";
import Moralis  from 'moralis';
import { getEllipsisTxt } from "../utils/format";


const transactions = () => {

  const [transactions, setTransactions] = useState();

  useEffect(() => {
    (async () => {
      await Moralis.start({
        apiKey: 'VSrOoiuUp303vcqi8Od52Pg8kcZFhOKCBf3SfHP7eQYGl7GN2dfw4mbxoJCYvZAA',
      });

      const response = await Moralis.EvmApi.transaction.getWalletTransactions({
        address: '0xABf3656c9AD45800171D582b83929B00C7F32b49',
        chain: 3,
        limit: 10
      });
      console.log("response", response.data.result);
      setTransactions(response.data.result)
    })();
  }, []);

  return (
    <>
    <Heading size="lg" marginBottom={6} marginTop={10}>
      Transactions
    </Heading>
    {transactions?.length ? (
      <Box border="2px" borderColor={'gray.300'} borderRadius="xl" padding="24px 18px">
        <TableContainer w={'full'}>
          <Table variant='striped' className="bg-gray-200">
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
                  <Td>{getEllipsisTxt(tx?.hash || '')}</Td>
                  <Td>{getEllipsisTxt(tx?.from_address || '')}</Td>
                  <Td>{getEllipsisTxt(tx?.to_address || '')}</Td>
                  <Td>{tx.gas}</Td>
                  <Td>{new Date(tx.blockTimestamp).toLocaleDateString()}</Td>
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
      <Box>Looks Like you do not have any transactions</Box>
    )}
  </>
  );
};



export default transactions;

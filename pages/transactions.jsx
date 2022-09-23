import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Heading,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { getSession } from "next-auth/react";
import Moralis  from 'moralis';
import { getEllipsisTxt } from "../utils/format";


const transactions = ({transactions}) => {
  const hoverTrColor = useColorModeValue('gray.300', 'gray.700');
  return (
    <>
    <Heading size="lg" marginBottom={6} marginTop={10}>
      Transactions
    </Heading>
    {transactions?.length ? (
      <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
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
                  <Td>{getEllipsisTxt(tx?.from || '')}</Td>
                  <Td>{getEllipsisTxt(tx?.to || '')}</Td>
                  <Td>{tx.gasUsed}</Td>
                  <Td>{new Date(tx.blockTimestamp).toLocaleDateString()}</Td>
                  <Td isNumeric>{tx.receiptStatus}</Td>
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

export const getServerSideProps = async (context) => {
    const session = await getSession(context)


await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY
});

if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  console.log(session);

const response = await Moralis.EvmApi.transaction.getWalletTransactions({
    address: session?.user?.address,
    chain: session?.user?.chainId,
    limit: 10
});

    return {
        props: {
            transactions: JSON.parse(JSON.stringify(response.result))
        }
    }

}


export default transactions;

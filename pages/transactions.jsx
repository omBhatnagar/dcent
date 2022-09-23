import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { getSession } from "next-auth/react";
import Moralis  from 'moralis';


const transactions = ({transactions}) => {

  console.log(transactions)
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
        <div>
            <h1 className="text-3xl">See all current chain Transactions</h1>
        </div>
      <div className="w-[80vw] mx-auto">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>from</Th>
                <Th>to</Th>
                <Th isNumeric>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              
                {transactions.map(trans => (
                    <Tr>
                        <Td>{trans.from}</Td>
                        <Td>{trans.to}</Td>
                        <Td>{trans.receiptStatus}</Td>
                    </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>from</Th>
                <Th>to</Th>
                <Th isNumeric>status</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </div>
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

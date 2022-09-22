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
// import { getSession } from "next-auth/react";
import Moralis from "moralis";

const ERC20Balances = ({ tokenBalance, error }) => {
  console.log(tokenBalance);
  console.log(error);
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
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tokenBalance?.map((bal) => (
                <Tr backgroundColor={"cyan"}>
                  <Td>{bal.token.name}</Td>
                  <Td>{bal.token.symbol}</Td>
                  <Td>{bal.value}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>from</Th>
                <Th>to</Th>
                <Th>status</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  // const session = await getSession(context);

  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  // if (!session?.user.address) {
  //   return { props: { error: "Connect your wallet first" } };
  // }

  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    address: "0x1fDa7f9bB9a55F26e33Dd957605A0474883e7DbD",
    chain: 3,
  });

  return {
    props: {
      tokenBalance: JSON.parse(JSON.stringify(response.result)),
    },
  };
};

export default ERC20Balances;

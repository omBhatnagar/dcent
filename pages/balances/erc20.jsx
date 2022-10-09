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
import Moralis from "moralis";
import { getEllipsisTxt } from "../../utils/getEllipsisTxt";
import { weiToEth } from "../../utils/weiToEth";

const ERC20Balances = () => {
  const [ERC20, setERC20] = useState();

  useEffect(() => {
    (async () => {
      await Moralis.start({
        apiKey:
          "VSrOoiuUp303vcqi8Od52Pg8kcZFhOKCBf3SfHP7eQYGl7GN2dfw4mbxoJCYvZAA",
      });

      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address: "0xABf3656c9AD45800171D582b83929B00C7F32b49",
        chain: 3,
        limit: 10,
      });
      setERC20(response.data);
    })();
  }, []);

  return (
    <>
      <Heading size="lg" marginBottom={6} marginTop={10}>
        ERC20Balances
      </Heading>
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
        <Box>Looks Like you do not have any transactions</Box>
      )}
    </>
  );
};

export default ERC20Balances;

import {
  Button,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Wallet = () => {
  const ETHTransfer = () => {
    const [formValues, setFormValues] = useState({
      to: "",
      amount: 0,
    });

    const handleChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    };

    const handleSendETH = async () => {
      const options = {
        type: "native",
        amount: Moralis.units.ETH(formValues.amount),
        receiver: formValues.to,
      };

      let result = await Moralis.transfer(options);
      console.log(result);
    };
    return (
      <div className="flex flex-col gap-2">
        <Input
          value={formValues.to}
          onChange={handleChange}
          name="to"
          placeholder="To"
        />
        <Input
          value={formValues.amount}
          onChange={handleChange}
          name="amount"
          placeholder="amount"
        />
        <Button colorScheme="blue" onClick={handleSendETH}>
          Send
        </Button>
      </div>
    );
  };

  const ERC20Transfer = () => {
    const [formValues, setFormValues] = useState({
      to: "",
      amount: 0,
      contract_address: "",
      decimals: "",
    });

    const handleChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    };

    const handleSendERC20 = async () => {
      const options = {
        type: "erc20",
        amount: Moralis.units.ETH(formValues.amount, formValues.decimals),
        receiver: formValues.to,
        contract_address: formValues.contract_address,
      };

      let result = await Moralis.transfer(options);
      console.log(result);
    };
    return (
      <div className="flex flex-col gap-2">
        <Input
          value={formValues.to}
          onChange={handleChange}
          name="to"
          placeholder="To"
        />
        <Input
          value={formValues.contract_address}
          onChange={handleChange}
          name="contract_address"
          placeholder="Contract Address"
        />
        <Input
          value={formValues.amount}
          onChange={handleChange}
          name="amount"
          placeholder="amount"
        />
        <Input
          value={formValues.decimals}
          onChange={handleChange}
          name="decimals"
          placeholder="Decimals"
        />
        <Button colorScheme="blue" onClick={handleSendERC20}>
          Send
        </Button>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-96 border border-gray-300 shadow-md p-4">
        <Tabs>
          <TabList>
            <Tab>ETH</Tab>
            <Tab>ERC20</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ETHTransfer />
            </TabPanel>
            <TabPanel>
              <ERC20Transfer />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;

import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface CartSummaryProps {
  price: number;
  items: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ price, items }) => {
  return (
    <Flex p={5} justify="space-between">
      <Flex direction="column">
        <Text>Total Price before tax: ${price}</Text>
        <Text>Total number of Items: {items}</Text>
      </Flex>
      <Button>Check out</Button>
    </Flex>
  );
};

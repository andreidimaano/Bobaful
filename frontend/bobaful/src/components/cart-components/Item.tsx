import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface ItemProps {
  name: string;
  quantity: number;
  price: number;
}

export const Item: React.FC<ItemProps> = ({ name, quantity, price }) => {
  return (
    <>
      <Flex p={5} justify="space-between">
        <Flex>
          <Box mr={3} maxW={85} maxH={100}>
            <Image src="/images/red_boba_small.png" width="auto" height="100" />
          </Box>
          <Flex direction="column">
            <Text>{name}</Text>
            <Text>Quantity: {quantity}</Text>
            <Text>Price: ${price}</Text>
          </Flex>
        </Flex>
        <IconButton my="auto" icon={<DeleteIcon />} aria-label="Remove Item" />
      </Flex>
      <Divider />
    </>
  );
};

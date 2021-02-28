import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Heading } from "../components/authentication-components/Heading";
import { CartSummary } from "../components/cart-components/CartSummary";
import { Item } from "../components/cart-components/Item";
import { Wrapper } from "../components/cart-components/Wrapper";
import { Navbar } from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";

interface cartProps {}

const cart: React.FC<cartProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Wrapper width="800px">
        <Box mx={5} my={3}>
          <Heading text="Your Cart (# of Items)"></Heading>
        </Box>
        <Divider />
        <Item name="Item name #1" quantity={1} price={20.99} />
        <Item name="Item name #2" quantity={3} price={15.5} />
      </Wrapper>
      <Wrapper width="700px">
        <CartSummary price={35.99} items={4} />
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(cart);

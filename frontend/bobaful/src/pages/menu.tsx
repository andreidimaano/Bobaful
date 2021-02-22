import {
  Box,
  Button,
  DarkMode,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { MenuItemModal } from "../components/menu-components/modal";
import { Navbar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface menuProps {}

const Menu: React.FC<menuProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Box>
        <MenuItemModal priceString={"1350"} />
        <Divider />
        <MenuItemModal priceString={"1350"} />
        <Divider />
        <MenuItemModal priceString={"1350"} />
        <Divider />
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Menu);

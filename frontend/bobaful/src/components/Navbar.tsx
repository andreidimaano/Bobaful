import { StarIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Link } from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Logo } from "./navbar-components/Logo";
import { MenuToggle } from "./navbar-components/MenuToggle";
import { FaShoppingCart } from "react-icons/fa";
import NextLink from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      px={4}
      height={16}
      borderBottom="2px"
      borderColor="gray.200"
    >
      <MenuToggle />
      <Logo color={["black"]} />
      <NextLink href="/cart">
        <Button variant="solid" colorScheme="red">
          <Icon color="white" as={FaShoppingCart} boxSize={6} />
        </Button>
      </NextLink>
    </Flex>
  );
};

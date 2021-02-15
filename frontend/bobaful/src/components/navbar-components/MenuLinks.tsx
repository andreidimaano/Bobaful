import { Box, Divider, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaReceipt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

interface MenuLinksProps {}

export const MenuLinks: React.FC<MenuLinksProps> = () => {
  return (
    <Box
      pos="fixed"
      left={0}
      top={0}
      overflow={"auto"}
      py={5}
      width={"350px"}
      minH={"100%"}
      borderRight="2px"
      borderColor="gray.200"
      bg="white"
      sx={{
        "@media screen and (max-width: 768px)": {
          width: "100%",
        },
      }}
    >
      <Stack
        spacing={8}
        // align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        pt={[4, 4, 0, 0]}
        px={5}
      >
        <NextLink href="/">
          <Link>
            <Flex direction="row" align="center">
              <Icon as={AiFillHome} boxSize={8} mr={4} />
              <Text fontWeight={"bold"}>Home</Text>
            </Flex>
          </Link>
        </NextLink>
        <Divider />
        <NextLink href="/menu">
          <Link>
            <Flex direction="row" align="center">
              <Icon as={FaReceipt} boxSize={8} mr={4} />
              <Text fontWeight={"bold"}>Order</Text>
            </Flex>
          </Link>
        </NextLink>
        <Divider />
        <NextLink href="/signup">
          <Link>
            <Flex direction="row" align="center">
              <Icon as={BsFillPersonFill} boxSize={8} mr={4} />
              <Text fontWeight={"bold"}>Sign Up or Sign In</Text>
            </Flex>
          </Link>
        </NextLink>
        <Divider />
        <NextLink href="/">
          <Link>
            <Flex direction="row" align="center">
              <Icon as={IoLogOut} boxSize={8} mr={4} />
              <Text fontWeight={"bold"}>Log Out</Text>
            </Flex>
          </Link>
        </NextLink>
      </Stack>
    </Box>
  );
};

import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, MenuItem, Slide, Stack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Logo } from './navbar-components/Logo';
import { MenuLinks } from './navbar-components/MenuLinks';
import { MenuToggle } from './navbar-components/MenuToggle';


interface NavbarProps {

}

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
            <MenuToggle/>
            <Logo
                color={["black"]}
            />
            <StarIcon boxSize={6}/>
        </Flex>
    );
} 

import { Box, Flex, Link, MenuItem, Stack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Logo } from './navbar-components/Logo';
import { MenuLinks } from './navbar-components/MenuLinks';
import { MenuToggle } from './navbar-components/MenuToggle';


interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            color={["black", "black", "primary.700", "primary.700"]}
        >
            <Logo 
                w="100px"
                color={["black"]}
            />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </Flex>
    );
} 

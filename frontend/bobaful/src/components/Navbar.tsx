import { Box, Link, MenuItem, Stack } from '@chakra-ui/react';
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
        <Box>
        <Logo 
            w="100px"
            color={["black"]}
        />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
        </Box>
    );
} 

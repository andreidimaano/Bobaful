import { Box, Button, DarkMode, Divider, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stat, StatLabel, StatNumber, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image'
import React from 'react'
import { MenuItemModal } from '../components/menu-components/modal';
import { Navbar } from '../components/Navbar';


interface menuProps {

}

const Menu: React.FC<menuProps> = ({}) => {
    return (
        <>
        <Navbar />
        <Box>
            <MenuItemModal price={"10.23"}/>
            <Divider />
            <MenuItemModal price={"12.00"}/>
            <Divider />
            <MenuItemModal price={"14.00"}/>
            <Divider />
        </Box>
        </>
    );
}

export default Menu


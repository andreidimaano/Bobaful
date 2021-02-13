import { Flex, Box, Heading, Stat, StatNumber, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image'
import React from 'react'

interface modalProps {

}

export const MenuItemModal: React.FC<modalProps> = ({}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
        <Flex as="button" width={"100%"} onClick={onOpen} justify="space-between" align="center" p={4}>
            <Flex direction="column" textAlign="left">
                <Box width="350px">
                    <Heading size="md" >Thai Oat</Heading>
                    <Text>A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                    <Stat>
                        <StatNumber>$10.00</StatNumber> 
                    </Stat>
                </Box>
            </Flex>
            <Box maxW={"83px"} maxH={"125px"}>
                <Image src="/images/red_boba_small.png" alt={"boba picture"} object-fit={"cover"} width={"auto"} height="125"/>
            </Box>
        </Flex>
        <Modal 
            onClose={onClose} 
            isOpen={isOpen} 
            scrollBehavior={"inside"}
            isCentered
        >
            <ModalOverlay align="center" justifyContent="center" />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader> Thai Oat</ModalHeader>
                <ModalBody align="center">
                    <Box maxH={"539px"}>
                        <Image src="/images/red_boba.png" alt={"boba picture"} object-fit={"cover"} width={"auto"} height="300"/>
                    </Box>
                    <Text textAlign="left">A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        <Text fontWeight={"bold"} >Add to Cart - </Text>
                        <Text fontWeight={"bold"} >$10.00</Text>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    );
}
import { Box, Button, DarkMode, Divider, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stat, StatLabel, StatNumber, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image'
import React from 'react'
import { Navbar } from '../components/Navbar';


interface menuProps {

}

const Menu: React.FC<menuProps> = ({}) => {
    type ScrollBehavior = "inside" | "outside";
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState("inside" as ScrollBehavior);
    const boba = {
        url: "images/red_boba.png",
        url2: "https://kitchenconfidante.com/wp-content/uploads/2020/04/Dalgona-Coffee-with-Boba-kitchenconfidante.com-7339-500x375.jpg",
        alt: "red boba",
    }
    return (
        <>
        <Navbar />
        <Box>
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
                    <Image src="/images/red_boba_small.png" alt={boba.alt} object-fit={"cover"} width={"auto"} height="125"/>
                </Box>
            </Flex>
            <Modal 
                onClose={onClose} 
                isOpen={isOpen} 
                scrollBehavior={scrollBehavior}
                isCentered
            >
                <ModalOverlay align="center" justifyContent="center" />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader> Thai Oat</ModalHeader>
                    <ModalBody align="center">
                        <Box maxH={"539px"}>
                            <Image src="/images/red_boba.png" alt={boba.alt} object-fit={"cover"} width={"auto"} height="300"/>
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
            <Divider />
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
                        <Image src="/images/red_boba_small.png" alt={boba.alt} object-fit={"cover"} width={"auto"} height="125"/>
                    </Box>
                </Flex>
            <Divider />
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
                    <Image src="/images/red_boba_small.png" alt={boba.alt} object-fit={"cover"} width={"auto"} height="125"/>
                </Box>
            </Flex>
            <Divider />
        </Box>
        </>
    );
}

export default Menu


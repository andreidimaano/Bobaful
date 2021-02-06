import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image'
import React from 'react'


interface menuProps {

}

const Menu: React.FC<menuProps> = ({}) => {
    const boba = {
        url: "images/red_boba.png",
        url2: "https://kitchenconfidante.com/wp-content/uploads/2020/04/Dalgona-Coffee-with-Boba-kitchenconfidante.com-7339-500x375.jpg",
        alt: "red boba",
    }
    return (
        <Box>
            <Flex>
                <Image src="/images/red_boba.png" alt={boba.alt} width="369" height="539"/>
                <Flex direction="column">
                    <Box px={8}>
                        <Text>Thai Oat</Text>
                        <Text>A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                        <Text>$10.00</Text> 
                    </Box>
                </Flex>
            </Flex>
            <Flex>
                <Image src="/images/red_boba.png" alt={boba.alt} width="369" height="539"/>
                <Flex direction="column">
                    <Box px={8}>
                        <Text>Thai Oat</Text>
                        <Text>A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                        <Text>$10.00</Text> 
                    </Box>
                </Flex>
            </Flex>
            <Flex>
                <Image src="/images/red_boba.png" alt={boba.alt} width="369" height="539"/>
                <Flex direction="column">
                    <Box px={8}>
                        <Text>Thai Oat</Text>
                        <Text>A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                        <Text>$10.00</Text> 
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Menu


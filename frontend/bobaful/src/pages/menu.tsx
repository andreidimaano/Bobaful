import { Box, DarkMode, Divider, Flex, Heading, Stat, StatNumber, Text } from '@chakra-ui/react';
import Image from 'next/image'
import React from 'react'
import { Navbar } from '../components/Navbar';


interface menuProps {

}

const Menu: React.FC<menuProps> = ({}) => {
    const boba = {
        url: "images/red_boba.png",
        url2: "https://kitchenconfidante.com/wp-content/uploads/2020/04/Dalgona-Coffee-with-Boba-kitchenconfidante.com-7339-500x375.jpg",
        alt: "red boba",
    }
    return (
        <>
        <Navbar />
        <Box>
            <Flex justify="space-between" align="center" p={4}>
                <Flex direction="column">
                    <Box width="400px">
                        <Heading size="md" >Thai Oat</Heading>
                        <Text>A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                        <Stat>
                            <StatNumber>$10.00</StatNumber> 
                        </Stat>
                    </Box>
                </Flex>
                <Image src="/images/red_boba.png" alt={boba.alt} width="125" height="125"/>
            </Flex>
            <Divider />
            <Flex justify="space-between" align="center" p={4}>
                <Flex direction="column">
                    <Box width="400px">
                        <Heading size="md" >Thai Oat</Heading>
                        <Text>A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                        <Stat>
                            <StatNumber>$10.00</StatNumber> 
                        </Stat>
                    </Box>
                </Flex>
                <Image src="/images/red_boba.png" alt={boba.alt} width="125" height="125"/>
            </Flex>
            <Divider />
            <Flex justify="space-between" align="center" p={4}>
                <Flex direction="column">
                    <Box width="400px">
                        <Heading size="md" >Thai Oat</Heading>
                        <Text>A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                        <Stat>
                            <StatNumber>$10.00</StatNumber> 
                        </Stat>
                    </Box>
                </Flex>
                <Image src="/images/red_boba.png" alt={boba.alt} width="125" height="125"/>
            </Flex>
            <Divider />
        </Box>
        </>
    );
}

export default Menu


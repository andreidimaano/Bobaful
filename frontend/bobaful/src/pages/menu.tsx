import { Box } from '@chakra-ui/react';
import { Image } from "@chakra-ui/image"
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
            <Image src={boba.url2} alt={boba.alt} />
        </Box>
    );
}

export default Menu


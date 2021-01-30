import { Box, Text } from '@chakra-ui/react';
import React from 'react'

interface LogoProps {
    w: string,
    color: string[],
}

export const Logo: React.FC<LogoProps> = ({w, color}) => {
    return (
        <Box w={w} color={color}>
            <Text fontSize="lg" fontWeight="bold">
                Bobaful
            </Text>
        </Box>
    );
}
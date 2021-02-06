import { Box, Text } from '@chakra-ui/react';
import React from 'react'

interface LogoProps {
    color: string[],
}

export const Logo: React.FC<LogoProps> = ({color}) => {
    return (
        <Box color={color}>
            <Text fontSize="lg" fontWeight="bold">
                Bobaful
            </Text>
        </Box>
    );
}
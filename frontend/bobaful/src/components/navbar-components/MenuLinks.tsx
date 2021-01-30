import { Box, Link, Stack } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";

interface MenuLinksProps {
    isOpen: boolean
}

export const MenuLinks: React.FC<MenuLinksProps> = ({isOpen}) => {
    return (
        <Box
            display={{ base: isOpen? "block" : "none", md: "block"}}
            flexBasis={{ base: "100%", md: "auto"}}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <NextLink href="/">
                    <Link>
                        HelloWorld
                    </Link>
                </NextLink>
                <NextLink href="/">
                    <Link>
                        HelloWorld
                    </Link>
                </NextLink>
                <NextLink href="/">
                    <Link>
                        HelloWorld
                    </Link>
                </NextLink>
                <NextLink href="/">
                    <Link>
                        HelloWorld
                    </Link>
                </NextLink>
            </Stack>
        </Box>
    );
}
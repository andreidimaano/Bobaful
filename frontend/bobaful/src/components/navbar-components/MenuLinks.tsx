import { Box, Link, Slide, Stack } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";

interface MenuLinksProps {
}

export const MenuLinks: React.FC<MenuLinksProps> = () => {
    return (
            <Box
                pos="fixed"
                left={0}
                top={16}
                overflow={"auto"}
                py={5}
                width={80}
                minH={"100%"}
                borderRight="2px"
                borderColor="gray.200"
            >
                <Stack
                    spacing={8}
                    // align="center"
                    justify={["center", "space-between", "flex-end", "flex-end"]}
                    pt={[4, 4, 0, 0]}
                    px={5}
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
                </Stack>
            </Box>
    );
}
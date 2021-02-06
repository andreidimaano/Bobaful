import { Box, Link, Stack } from '@chakra-ui/react';
import NextLink from "next/link";
import React from 'react';

interface MenuLinksProps {
}

export const MenuLinks: React.FC<MenuLinksProps> = () => {
    return (
            <Box
                pos="fixed"
                left={0}
                top={0}
                overflow={"auto"}
                py={5}
                width={"350px"}
                minH={"100%"}
                borderRight="2px"
                borderColor="gray.200"
                bg="white"
                sx={{
                    "@media screen and (max-width: 768px)": {
                        width: "100%",
                    }
                }}
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
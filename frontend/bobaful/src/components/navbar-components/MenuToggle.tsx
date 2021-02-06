import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, Slide, useDisclosure, Text } from "@chakra-ui/react"
import React from "react"
import Menu from "../../pages/menu"
import { MenuLinks } from "./MenuLinks"

export const MenuToggle = () => {
    const {isOpen, onToggle} = useDisclosure()
    return (
        <>
        <Button
            onClick={onToggle}
        >
            <Box minWidth={6}>
                {isOpen ? <CloseIcon boxSize={4}/> : <HamburgerIcon boxSize={6}/>}
            </Box>
        </Button>
        <Slide 
            direction="left" 
            in={isOpen} 
            style={{zIndex: 10, position: "fixed", top: 64}}
        >
            <MenuLinks />
        </Slide>
        </>
    )
}
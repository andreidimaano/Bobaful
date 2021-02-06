import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, Slide } from "@chakra-ui/react"
import React from "react"
import { MenuLinks } from "./MenuLinks"

export const MenuToggle = ({toggle, isOpen}) => {
    return (
        <Button
            onClick={toggle}
        >
            <Box minWidth={6}>
                {isOpen ? <CloseIcon boxSize={4}/> : <HamburgerIcon boxSize={6}/>}
            </Box>
            <Slide direction="left" in={isOpen} style={{zIndex: 10}}>
                <MenuLinks />
            </Slide>
        </Button>
    )
}
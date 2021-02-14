import { Flex, Box, Heading, Stat, StatNumber, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button, Text, useDisclosure, useNumberInput, Input } from '@chakra-ui/react';
import Dinero from 'dinero.js';
import Image from 'next/image'
import React, { useState } from 'react'

interface modalProps {
    priceString: string
}

export const MenuItemModal: React.FC<modalProps> = ({priceString}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    let price = parseInt(priceString);
    let width =  (360 / 539 * 300).toString();

    let [state, setQuantity] = useState({quantity: 1, totalPrice: (price / 100).toFixed(2)});
    let changePrice = (event) => {
        if(event.target.value != '-') {
            setQuantity({quantity: event.target.value, totalPrice: Math.abs(price * event.target.value / 100).toFixed(2)});
        }
    } 

    let [isDecDisabled, setDecDisabled] = useState(true);
    let [isIncDisabled, setIncDisabled] = useState(false);
    
    let decreasePrice = () => {
        let newQuantity = state.quantity - 1;
        if(isIncDisabled) {
            setIncDisabled(!isIncDisabled);
        }
        if(state.quantity <= 2) {
            setDecDisabled(!isDecDisabled);
        }
        setQuantity({quantity: newQuantity, totalPrice: (price * newQuantity / 100).toFixed(2)});
    }

    let increasePrice = () => {
        let newQuantity = state.quantity + 1;
        if(isDecDisabled) {
            setDecDisabled(!isDecDisabled);
        }
        if(state.quantity + 1 === 6) {
            setIncDisabled(!isIncDisabled);
        }
        setQuantity({quantity: newQuantity, totalPrice: (price * newQuantity / 100).toFixed(2)});
    }


    return (
        <>
        <Flex as="button" width={"100%"} onClick={onOpen} justify="space-between" align="center" p={4}>
            <Flex direction="column" textAlign="left">
                <Box width="350px">
                    <Heading size="md" >Thai Oat</Heading>
                    <Text>A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                    <Stat>
                        <StatNumber>${(price / 100).toFixed(2)}</StatNumber> 
                    </Stat>
                </Box>
            </Flex>
            <Box maxW={"83px"} maxH={"125px"}>
                <Image src="/images/red_boba_small.png" alt={"boba picture"} object-fit={"cover"} width={"auto"} height="125"/>
            </Box>
        </Flex>
        <Modal 
            onClose={onClose} 
            isOpen={isOpen} 
            scrollBehavior={"inside"}
            isCentered
        >
            <ModalOverlay align="center" justifyContent="center" />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader> Thai Oat</ModalHeader>
                <ModalBody align="center">
                    <Box maxH={"539px"}>
                        <Image src="/images/red_boba.png" alt={"boba picture"} object-fit={"cover"} width={width} height="300"/>
                    </Box>
                    <Text textAlign="left">A healthier version of the original thai tea paired with our house oat milk. A definite fan favorite</Text>
                </ModalBody>
                <ModalFooter>
                    <Flex direction="row" justifyContent="flex-end" align="center">
                        <Button isDisabled={isDecDisabled} onClick={decreasePrice} mr={2}>-</Button>
                        <Input type={"number"} value={state.quantity} onChange={changePrice} textAlign="center" maxW="52px" isReadOnly={true}/>
                        <Button isDisabled={isIncDisabled} onClick={increasePrice}  ml={2}>+</Button>
                        <Button ml={8} colorScheme="red" mr={2} onClick={onClose}>
                            <Text fontWeight={"bold"} >Add to Cart - </Text>
                            <Text fontWeight={"bold"} >${state.totalPrice}</Text>
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    );
}
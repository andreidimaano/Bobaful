import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Stat, StatNumber, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';

interface modalProps {
    priceString: string
}

export const MenuItemModal: React.FC<modalProps> = ({priceString}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    // let price = parseInt(priceString);
    let width =  (360 / 539 * 300).toString();

    let [price, setPrice] = useState(parseInt(priceString));
    let [state, setQuantity] = useState({quantity: 1, totalPrice: (price / 100).toFixed(2)});
    let [isDecDisabled, setDecDisabled] = useState(true);
    let [isIncDisabled, setIncDisabled] = useState(false);

    let changePrice = (value: string) => {
        let newPrice = parseInt(value);
        setPrice(newPrice);
        setQuantity({quantity: state.quantity, totalPrice: (newPrice * state.quantity / 100).toFixed(2)})
    }

    let decreaseQuantity = () => {
        let newQuantity = state.quantity - 1;
        if(isIncDisabled) {
            setIncDisabled(!isIncDisabled);
        }
        if(state.quantity <= 2) {
            setDecDisabled(!isDecDisabled);
        }
        setQuantity({quantity: newQuantity, totalPrice: (price * newQuantity / 100).toFixed(2)});
    }

    let increaseQuantity = () => {
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
                        <StatNumber>${(parseInt(priceString) / 100).toFixed(2)}</StatNumber> 
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
                    <FormControl id="size" my={4}>
                        <FormLabel as="legend">Select Size</FormLabel>
                        <RadioGroup onChange={(value: string) => {changePrice(value)}} value={price.toString()} defaultValue={price.toString()}>
                            <Stack>
                                <Flex justifyContent="space-between" >
                                    <Radio value="1350">Small (32oz)</Radio>
                                </Flex>
                                <Divider/>
                                <Flex justifyContent="space-between" >
                                    <Radio value="2600">Medium 64oz</Radio>
                                    <Text>$26.00</Text>
                                </Flex>
                                <Divider/>
                                <Flex justifyContent="space-between" >
                                    <Radio value="4500">Large 128oz</Radio>
                                    <Text>$45.00</Text>
                                </Flex>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Flex direction="row" justifyContent="flex-end" align="center">
                        <Button isDisabled={isDecDisabled} onClick={decreaseQuantity} mr={2}>-</Button>
                        <Input type={"number"} value={state.quantity} textAlign="center" maxW="52px" isReadOnly={true}/>
                        <Button isDisabled={isIncDisabled} onClick={increaseQuantity}  ml={2}>+</Button>
                        <Button ml={8} colorScheme="red" mr={2} onClick={onClose}>
                            <Text fontWeight={"bold"} mr={1}>Add to Cart - </Text>
                            <Text fontWeight={"bold"} >${state.totalPrice}</Text>
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    );
}
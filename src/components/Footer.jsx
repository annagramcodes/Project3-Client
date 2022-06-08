import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import logo from "../images/tattoo.png";

function Footer() {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={5}
      bg="gray.800"
    >
      <Image px="5" w="100px" src={logo} />
      <Text px={7} color="whiteAlpha.900" fontSize="md">
        Made by Alexandre Alves && Anna Egger @Ironhack 2022
      </Text>
    </Flex>
  );
}

export default Footer;

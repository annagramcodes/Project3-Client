import { Flex, Tag, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Flex justifyContent="center" alignItems="center" py={5} bg="gray.900">
      <Text px={7} color="whiteAlpha.900" fontSize="md">
        Made by Alexandre Alves && <span>Anna Egger </span>@Ironhack 2022
      </Text>
    </Flex>
  );
}

export default Footer;

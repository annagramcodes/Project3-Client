import { Box, Container, Flex, Button, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ArtistContent(props) {
  const { artist } = props;
  const { user } = useContext(AuthContext);
  return (
    <Box boxShadow="base" textAlign="left" p="6" rounded="md">
      <Heading as="h3">{artist.name}</Heading>
      <Heading py={4} as="h6" fontSize={{ base: "16px" }}>
        Workspace
      </Heading>
      <Text>{artist.location}</Text>
      <Heading as="h6" fontSize={{ base: "16px" }}>
        Working hours
      </Heading>
      <Text>{artist.businessHours}</Text>
      <Flex flexWrap="wrap">
        {artist.styles.map((style) => (
          <Text
            border="1px solid lightgrey"
            borderRadius="2xl"
            py={1}
            px={3}
            fontSize="md"
            m={2}
          >
            {style}
          </Text>
        ))}
      </Flex>
    </Box>
  );
}

export default ArtistContent;

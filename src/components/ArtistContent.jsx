import { Box, Container, Flex, Button, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ArtistContent(props) {
  const { artist } = props;
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <Box>
        <Heading as="h1">{artist.name}</Heading>
        <Text>{artist.location}</Text>
        <Text>{artist.businessHours}</Text>
        <Flex flexWrap="wrap" justify="center">
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
    </Container>
  );
}

export default ArtistContent;

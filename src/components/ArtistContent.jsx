import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

function ArtistContent(props) {
  const { artist } = props;

  return (
    <Box>
      <Heading as="h1">{artist.name}</Heading>
      <Text>{artist.location}</Text>
    </Box>
  );
}

export default ArtistContent;

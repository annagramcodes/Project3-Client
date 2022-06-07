import { Box, Flex, Tag, TagLabel, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function ArtistCard(props) {
  const { artist } = props;

  return (
    <Box my={6} boxShadow="base" textAlign="left" p="6" rounded="md" w="300px">
      <Link to={`/artist/${artist._id}`}>
        <Heading color="gray.600" as="h2" pb={8}>
          {artist.name}
        </Heading>
        <Flex mt={6} gap={2} flexWrap="wrap">
          {artist.styles.map((style) => (
            <Tag
              size="lg"
              borderRadius="full"
              variant="outline"
              colorScheme="gray"
            >
              <TagLabel color="gray.600">{style}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </Link>
    </Box>
  );
}

export default ArtistCard;

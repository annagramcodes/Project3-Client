import {
  Box,
  Flex,
  Tag,
  Text,
  TagLabel,
  Heading,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function ArtistCard(props) {
  const { artist } = props;

  return (
    <>
      {artist && (
        <Link to={`/artist/${artist._id}`}>
          <Box
            my={6}
            boxShadow="base"
            textAlign="left"
            borderRadius="3xl"
            w="330px"
            h="400px"
          >
            <Image
              w="330px"
              borderRadius="1.5rem 1.5rem 0 0"
              h="180px"
              objectFit="cover"
              src={artist.portfolioImages[0]}
              alt=""
            />
            <Flex py={4} px={4} align="center" gap={3}>
              <Image
                borderRadius="full"
                boxSize="50px"
                objectFit="cover"
                src={artist.owner?.imageUrl}
                alt=""
              />

              <Box>
                <Heading fontSize="xl" color="gray.700" as="h2">
                  {artist.name}
                </Heading>
                <Text>{artist.location}</Text>
              </Box>
            </Flex>
            <Box mx={4} pt={2} borderTop="1px" borderColor="gray.200">
              <Heading pt={2} pb={1} color="gray.600" as="h6" fontSize="lg">
                Styles
              </Heading>
              <Flex py={3} gap={2} flexWrap="wrap">
                {artist.styles.map((style) => (
                  <Tag
                    size="lg"
                    borderRadius="full"
                    variant="outline"
                    color="gray.100"
                  >
                    <TagLabel color="gray.500">{style}</TagLabel>
                  </Tag>
                ))}
              </Flex>
            </Box>
          </Box>
        </Link>
      )}
    </>
  );
}

export default ArtistCard;

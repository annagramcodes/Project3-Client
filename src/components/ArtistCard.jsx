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
    <Link to={`/artist/${artist._id}`}>
      <Box
        my={6}
        boxShadow="base"
        textAlign="left"
        rounded="md"
        w="300px"
        minHeight="380px"
      >
        <Image
          mb={3}
          w="300px"
          h="200px"
          objectFit="cover"
          src={artist.portfolioImages[0]}
          alt=""
        />
        <Flex px={4} align="center" gap={3}>
          <Image
            borderRadius="full"
            boxSize="50px"
            objectFit="cover"
            src={artist.owner.imageUrl}
            alt=""
          />
          <Box pb={4}>
            <Heading fontSize={{ base: "22px" }} color="gray.600" as="h2">
              {artist.name}
            </Heading>
            <Text>{artist.location}</Text>
          </Box>
        </Flex>
        <Flex
          px={2}
          py={4}
          gap={1}
          borderTop="1px"
          borderColor="gray.200"
          flexWrap="wrap"
        >
          <Heading color="gray.700" as="h6" py={1} fontSize="sm">
            Styles
          </Heading>

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
      </Box>
    </Link>
  );
}

export default ArtistCard;

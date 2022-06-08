import {
  Box,
  Flex,
  Heading,
  Image,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ArtistContent(props) {
  const { artist, children } = props;
  const { user } = useContext(AuthContext);

  return (
    <Box bg="white" boxShadow="base" textAlign="left" p="6" rounded="md">
      <Flex
        flexDirection={{ base: "column-reverse", md: "row" }}
        gap={{ sm: "20px", md: "80px" }}
      >
        <Box>
          <Heading color="gray.600" as="h2" pb={8}>
            {artist.name}
          </Heading>
          <Heading color="gray.700" pb={0.5} as="h6" fontSize="16px">
            Workspace:
          </Heading>
          <Text color="gray.600" mb={2}>
            {artist.location}
          </Text>
          <Heading color="gray.700" as="h6" py={1} fontSize="16px">
            Working Hours:
          </Heading>
          <Text mb={2}>{artist.businessHours}</Text>
          <Flex mb={4} mt={6} gap={2} flexWrap="wrap">
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
        <Box>
          <Image
            borderRadius="full"
            w="150px"
            objectFit="cover"
            src={user.imageUrl}
            alt=""
          />
        </Box>
      </Flex>
      <Box py={2} borderTop="1px" borderColor="gray.200">
        {children}
      </Box>
    </Box>
  );
}

export default ArtistContent;

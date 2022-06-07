import {
  Box,
  Container,
  Image,
  Flex,
  Button,
  Heading,
  Text,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import React, { Children, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link as ReachLink } from "react-router-dom";

function ArtistContent(props) {
  const { artist, children } = props;
  const { user } = useContext(AuthContext);

  return (
    <Box boxShadow="base" textAlign="left" p="6" rounded="md">
      <Flex
        flexDirection={{ sm: "column", md: "row" }}
        gap={{ sm: "20px", md: "80px" }}
      >
        <Box>
          <Heading color="gray.600" as="h2" pb={8}>
            {artist.name}
          </Heading>
          <Heading
            color="gray.700"
            pb={0.5}
            as="h6"
            fontSize={{ sm: "16px", md: "18px" }}
          >
            Workspace:
          </Heading>
          <Text color="gray.600" mb={2}>
            {artist.location}
          </Text>
          <Heading
            color="gray.700"
            as="h6"
            py={1}
            fontSize={{ sm: "16px", md: "18px" }}
          >
            Working Hours:
          </Heading>
          <Text mb={2}>{artist.businessHours}</Text>
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
      <Box mt={4} py={4} borderTop="1px" borderColor="gray.200">
        {children}
      </Box>
    </Box>
  );
}

export default ArtistContent;

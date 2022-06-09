import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link as ReachLink } from "react-router-dom";

function FavoriteList(props) {
  const { artist, favourites } = props;
  console.log(artist);
  return (
    <>
      {favourites && (
        <>
          {favourites.map((favourite) => {
            return (
              <ReachLink to={`/artist/${favourite._id}`}>
                <Flex gap={2} p={2} align="center">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    objectFit="cover"
                    src={favourite?.portfolioImages[0]}
                    alt=""
                  />
                  <Box textAlign="left">
                    <Heading mt={3} as="h6" fontSize="xl" fontWeight="bold">
                      {favourite.name}
                    </Heading>
                    <Text>{favourite.location}</Text>
                  </Box>
                </Flex>
              </ReachLink>
            );
          })}
        </>
      )}
    </>
  );
}

export default FavoriteList;

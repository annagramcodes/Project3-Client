import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link as ReachLink } from "react-router-dom";

function FavoriteList(props) {
  const { artist, favourites } = props;
  console.log(artist);
  return (
    <>
      {favourites && (
        <Box mt={6} boxShadow="base" textAlign="left" p="6" rounded="md">
          <Heading
            color="gray.700"
            pb={0.5}
            as="h4"
            fontSize={{ sm: "16px", md: "18px" }}
          >
            Favorite artists
          </Heading>
          {favourites.map((favourite) => {
            console.log(favourite);
            return (
              <Box>
                <ReachLink to={`/artist/${favourite._id}`}>
                  <Text>{favourite.name}</Text>
                  <Text>{favourite.location}</Text>
                </ReachLink>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}

export default FavoriteList;

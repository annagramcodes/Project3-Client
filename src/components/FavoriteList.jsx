import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

function FavoriteList(props) {
  const { favourites } = props;
  console.log(favourites);
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
            return (
              <Box>
                <Text>{favourite.name}</Text>
                <Text>{favourite.location}</Text>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}

export default FavoriteList;

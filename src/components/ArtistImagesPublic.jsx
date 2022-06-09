import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Image, SimpleGrid } from "@chakra-ui/react";
import styled from "@emotion/styled";

function ArtistImagesPublic(props) {
  const { artist, setArtist } = props;

  return (
    <SimpleGrid p={4} mb={5} columns={{ base: 1, md: 3 }} spacing={4}>
      {artist.portfolioImages.map((image, index) => {
        return (
          <Image
            key={artist._id}
            boxSize="300px"
            rounded="md"
            m="0"
            objectFit="cover"
            alt="tattoo"
            src={image}
          />
        );
      })}
    </SimpleGrid>
  );
}

export default ArtistImagesPublic;

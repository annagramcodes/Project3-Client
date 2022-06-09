import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Image, SimpleGrid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const ImageWrapper = styled(Box)`
  button {
    display: none;
  }
  &:hover button {
    display: block;
  }
`;

function ArtistImages(props) {
  const { artist, setArtist } = props;
  console.log(artist);

  const handleDelete = (indexToDelete) => {
    const filteredImages = artist.portfolioImages.filter(
      (img, index) => index !== indexToDelete
    );
    setArtist((artist) => ({
      ...artist,
      portfolioImages: filteredImages,
    }));
  };

  return (
    <SimpleGrid mb={5} columns={{ base: 1, md: 3 }} spacing={4}>
      {artist.portfolioImages.map((image, index) => {
        return (
          <ImageWrapper position="relative">
            <Image
              boxSize="300px"
              rounded="md"
              m="0"
              objectFit="cover"
              alt="tattoo"
              src={image}
            />
            <IconButton
              onClick={() => handleDelete(index)}
              position="absolute"
              right="-5px"
              top="-5px"
              colorScheme="red"
              isRound
              icon={<DeleteIcon />}
            />
          </ImageWrapper>
        );
      })}
    </SimpleGrid>
  );
}

export default ArtistImages;

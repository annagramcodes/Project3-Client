import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

function ArtistImages(props) {
  const { images } = props;

  return (
    <SimpleGrid columns={3} spacing={4}>
      {images.map((image) => {
        return <img src={image} />;
      })}
    </SimpleGrid>
  );
}

export default ArtistImages;

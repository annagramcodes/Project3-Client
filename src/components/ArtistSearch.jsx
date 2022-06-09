import React, { useState } from "react";
import { Button, Tag, TagLabel } from "@chakra-ui/react";

function ArtistSearch(props) {
  const { filteredArtist } = props;
  //const [search, setSearch] = useState("");

  const stylesMatrix = [
    { label: "blackwork" },
    { label: "chicano" },
    { label: "dotwork" },
    { label: "fineline" },
    { label: "geometric" },
    { label: "hand-poked" },
    { label: "lettering" },
    { label: "new-school" },
    { label: "old-school" },
    { label: "realism" },
    { label: "surrealism" },
    { label: "watercolor" },
    { label: "other" },
  ];

  return (
    <>
      {stylesMatrix.map((styles) => {
        return (
          <Button
            colorScheme="gray"
            mx={1.5}
            my={1.5}
            size="md"
            borderRadius="full"
            variant="outline"
            value={styles.label}
            onClick={filteredArtist}
            color="gray.600"
          >
            {styles.label}
          </Button>
        );
      })}
    </>
  );
}
export default ArtistSearch;

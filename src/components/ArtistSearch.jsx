import React, { useState } from "react";
import { Button, Tag, TagLabel } from "@chakra-ui/react";

function ArtistSearch(props) {
  const { filteredArtist } = props;
  //const [search, setSearch] = useState("");

  const stylesMatrix = [
    { label: "blackwork" },
    { label: "chicano" },
    { label: "dotwork" },
    { label: "realism" },
    { label: "fineline" },
    { label: "old-school" },
    { label: "new-school" },
    { label: "hand-poked" },
    { label: "geometric" },
    { label: "surrealism" },
    { label: "lettering" },
    { label: "watercolor" },
    { label: "geometric" },
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

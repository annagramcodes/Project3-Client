import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

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

  //   const handleSearch = (e) => {
  //     setSearch(e.target.value);
  //     filteredArtist(e.target.value);
  //   };

  return (
    <>
      {stylesMatrix.map((styles) => {
        return (
          <Button value={styles.label} onClick={filteredArtist}>
            {styles.label}
          </Button>
        );
      })}
    </>
  );
}
export default ArtistSearch;

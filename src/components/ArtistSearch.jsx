import React, { useState } from "react";

function ArtistSearch(props) {
  const { searchArtist } = props;
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchArtist(e.target.value);
  };

  return (
    <>
      <label htmlFor="search">Search</label>
      <input type="text" name="search" value={search} onChange={handleSearch} />
    </>
  );
}
export default ArtistSearch;

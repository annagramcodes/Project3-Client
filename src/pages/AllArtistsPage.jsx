import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArtistSearch from "../components/ArtistSearch";

function AllArtistsPage() {
  const [artist, setArtist] = useState([]);
  const [filteredArtist, setFilteredArtist] = useState([]);

  const allArtists = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/artist`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setArtist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allArtists();
  }, []);

  const filterArtist = (e) => {
    let filteredArtist = artist.filter((artist) =>
      artist.styles.includes(e.target.value)
    );
    setFilteredArtist(filteredArtist);
  };

  return (
    <div className="AllArtistPage">
      <ArtistSearch filteredArtist={filterArtist} />
      {filteredArtist.map((artists) => {
        return (
          <div key={artists._id}>
            <Link to={`/artist/${artists._id}`}>
              <p>{artists.name}</p>
              <p>{artists.styles}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default AllArtistsPage;

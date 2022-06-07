import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArtistSearch from "../components/ArtistSearch";

function AllArtistsPage() {
  const [artist, setArtist] = useState([]);

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

  const searchArtist = async (query) => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/artist/search?q=${query}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      console.log(query);
      setArtist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allArtists();
  }, []);

  return (
    <div className="AllArtistPage">
      <ArtistSearch searchArtist={searchArtist} />
      {artist.map((artists) => {
        return (
          <div key={artists._id}>
            <Link to={`/artist/${artists._id}`}>
              <p>{artists.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default AllArtistsPage;

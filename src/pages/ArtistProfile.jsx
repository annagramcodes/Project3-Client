import { Container, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

function ArtistProfile() {
  const [artist, setArtist] = useState();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/artist/byUser/${user._id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        setArtist(response.data);
      });
  }, []);

  if (!artist) {
    return <Spinner />;
  }

  return (
    <Container>
      <Heading as="h1">{artist.name}</Heading>
    </Container>
  );
}

export default ArtistProfile;

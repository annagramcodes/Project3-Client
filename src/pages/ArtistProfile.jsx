import { Container, Heading, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import useAxios from "../utils/axios.hook";

function ArtistProfile() {
  const [artist, setArtist] = useState();

  const { apiClient } = useAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    apiClient.get(`/api/artist/byUser/${user._id}`).then((response) => {
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

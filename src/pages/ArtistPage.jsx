import { Container, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistContent from "../components/ArtistContent";
import useAxios from "../utils/axios.hook";

function ArtistPage() {
  const [artist, setArtist] = useState();
  const { artistId } = useParams();

  const { apiClient } = useAxios();

  useEffect(() => {});
  apiClient.get(`/api/artist/${artistId}`).then((response) => {
    setArtist(response.data);
  }, []);

  if (!artist) {
    return <Spinner />;
  }

  return (
    <Container>
      <ArtistContent artist={artist} />
    </Container>
  );
}

export default ArtistPage;

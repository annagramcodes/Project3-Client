import { Button, Container, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import ArtistContent from "../components/ArtistContent";
import { AuthContext } from "../context/auth.context";
import useAxios from "../utils/axios.hook";

function ArtistDashboard() {
  const [artist, setArtist] = useState();
  const { user } = useContext(AuthContext);

  const { apiClient } = useAxios();

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
      <ArtistContent artist={artist} />
      <ReachLink to="/artist/edit">
        <Button>Edit Profile</Button>
      </ReachLink>
    </Container>
  );
}

export default ArtistDashboard;

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ArtistContent from "../components/ArtistContent";
import RequestButton from "../components/RequestButton";
import { AuthContext } from "../context/auth.context";
import useAxios from "../utils/axios.hook";
import { Link as ReachLink } from "react-router-dom";
import ArtistImages from "../components/ArtistImages";

function ArtistPage() {
  const [artist, setArtist] = useState();
  const { artistId } = useParams();
  const { apiClient } = useAxios();
  const { user } = useContext(AuthContext);

  const getArtist = async () => {
    apiClient.get(`/api/artist/${artistId}`).then((response) => {
      setArtist(response.data);
    });
  };
  useEffect(() => {
    getArtist();
  }, []);

  if (!artist) {
    return <Spinner />;
  }

  return (
    <Container>
      <Flex>
        <ArtistContent artist={artist} />
        <Box>
          <ArtistImages />
        </Box>
      </Flex>

      <Box>
        <ButtonGroup m={2}>
          <Link as={ReachLink} to={`/requests/${artist._id}/create`}>
            <RequestButton />
          </Link>
          <Button>Save</Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default ArtistPage;

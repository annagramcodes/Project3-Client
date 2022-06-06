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
    <Container py={5}>
      <Box>
        <ArtistContent artist={artist}>
          <Flex justify="center" align="center">
            <ButtonGroup>
              <Link as={ReachLink} to={`/requests/${artist._id}/create`}>
                <Button colorScheme="pink"> Book</Button>
              </Link>
              <Button colorScheme="grey" variant="outline">
                Save
              </Button>
            </ButtonGroup>
          </Flex>
        </ArtistContent>
      </Box>
      {!!artist.portfolioImages.length && <ArtistImages artist={artist} />}
      <Box></Box>
    </Container>
  );
}

export default ArtistPage;

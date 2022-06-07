import {
  Box,
  Button,
  Flex,
  Text,
  Container,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link as ReachLink } from "react-router-dom";
import ArtistContent from "../components/ArtistContent";
import ArtistImages from "../components/ArtistImages";
import { AuthContext } from "../context/auth.context";
import useAxios from "../utils/axios.hook";
import RequestContainer from "../components/RequestContainer";

function ArtistDashboard() {
  const [artist, setArtist] = useState();
  const { user } = useContext(AuthContext);
  const { apiClient } = useAxios();

  const onDrop = async (droppedFiles) => {
    const [file] = droppedFiles;
    const uploadData = new FormData();

    uploadData.append("imageUrl", file);

    const response = await apiClient.post(`/api/upload`, uploadData);

    setArtist((artist) => ({
      ...artist,
      portfolioImages: [...artist.portfolioImages, response.data.fileUrl],
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    apiClient.get(`/api/artist/byUser/${user._id}`).then((response) => {
      setArtist(response.data);
      console.log(response.data);
    });
  }, []);

  const saveImages = async () => {
    await apiClient.put(`/api/artist/${artist._id}`, artist);
    console.log("successfully saved artist", artist);
  };

  if (!artist) {
    return <Spinner />;
  }

  return (
    <Container py={{ sm: 4, md: 10 }}>
      <Box>
        <ArtistContent artist={artist}>
          <ReachLink to="/artist/edit">
            <Button mt={6}>Edit</Button>
          </ReachLink>{" "}
        </ArtistContent>
      </Box>
      <Heading color="gray.600" my={10} as="h2">
        Create your portfolio
      </Heading>
      {!!artist.portfolioImages.length && (
        <ArtistImages artist={artist} setArtist={setArtist} />
      )}
      <Box h="80px" p={3} bg="white" border="1px dashed lightgrey" m={4}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Text pt={3}>Drag and drop your images here</Text>
        </div>
      </Box>
      <Button colorScheme="pink" onClick={saveImages}>
        Save Collection
      </Button>
      <RequestContainer requests={artist.requestsReceived} />
    </Container>
  );
}

export default ArtistDashboard;

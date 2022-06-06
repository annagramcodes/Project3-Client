import { Box, Button, Flex, Container, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link as ReachLink } from "react-router-dom";
import ArtistContent from "../components/ArtistContent";
import ArtistImages from "../components/ArtistImages";
import { AuthContext } from "../context/auth.context";
import useAxios from "../utils/axios.hook";

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
    <Container>
      <Flex
        flexDirection={{ sm: "column", md: "row" }}
        w="50vw"
        gap={{ sm: "20px", md: "80px" }}
      >
        <ArtistContent artist={artist} />

        <Box>
          {!!artist.portfolioImages.length && (
            <ArtistImages images={artist.portfolioImages} />
          )}
          <Box p={3} bg="white" border="1px dashed lightgrey" m={4}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Please drag and drop</p>
            </div>
          </Box>
          <Button onClick={saveImages}>Save Images</Button>
        </Box>
      </Flex>
      <ReachLink to="/artist/edit">
        <Button>Edit Dashboard</Button>
      </ReachLink>
    </Container>
  );
}

export default ArtistDashboard;

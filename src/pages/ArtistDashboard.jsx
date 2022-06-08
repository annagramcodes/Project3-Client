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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ArtistDashboard() {
  const [artist, setArtist] = useState();
  const { user } = useContext(AuthContext);
  const { apiClient } = useAxios();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newRequest, setNewRequest] = useState();

  const onDrop = async (droppedFiles) => {
    setIsUploading(true);
    const [file] = droppedFiles;
    const uploadData = new FormData();

    uploadData.append("imageUrl", file);

    const response = await apiClient.post(`/api/upload`, uploadData);

    setArtist((artist) => ({
      ...artist,
      portfolioImages: [...artist.portfolioImages, response.data.fileUrl],
    }));
    setIsUploading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const successHandle = () => {
    toast.success("Yay", {
      position: "top-center",
      autoClose: 1000,
      closeOnClick: true,
    });
  };

  useEffect(() => {
    apiClient.get(`/api/artist/byUser/${user._id}`).then((response) => {
      setArtist(response.data);
      successHandle();
    });
  }, []);

  const saveImages = async () => {
    setIsSaving(true);
    await apiClient.put(`/api/artist/${artist._id}`, artist);
    console.log("successfully saved artist", artist);
    setIsSaving(false);
  };

  if (!artist) {
    return <Spinner />;
  }

  return (
    <Box>
      <Container maxW="container.lg" py={{ sm: 4, md: 10 }}>
        <Box m="auto" w={{ base: "70%", md: "md" }}>
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
        <Box
          h={{ base: "100px", md: "100px" }}
          w={{ base: "70%" }}
          p={3}
          bg="white"
          border="1px dashed lightgrey"
          m={4}
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isUploading ? (
              <Spinner />
            ) : (
              <Text pt={6}>Drag and drop your images here</Text>
            )}
          </div>
        </Box>
        <Button isLoading={isSaving} colorScheme="pink" onClick={saveImages}>
          Save Collection
        </Button>
        <RequestContainer requests={artist.requestsReceived} />
      </Container>
    </Box>
  );
}

export default ArtistDashboard;

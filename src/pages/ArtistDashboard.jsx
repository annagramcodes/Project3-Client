import {
  Box,
  Button,
  Flex,
  Text,
  Container,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
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
    toast.success("Collection saved succesfully", {
      position: "top-center",
      autoClose: 1000,
      closeOnClick: true,
    });
  };

  useEffect(() => {
    apiClient.get(`/api/artist/byUser/${user._id}`).then((response) => {
      setArtist(response.data);
      setNewRequest(response.data.requestsReceived);
    });
  }, []);

  // useEffect(() => {
  //   successHandle();
  // }, []);

  const saveImages = async () => {
    setIsSaving(true);
    await apiClient.put(`/api/artist/${artist._id}`, artist);
    console.log("successfully saved artist", artist);
    successHandle();
    setIsSaving(false);
  };

  if (!artist) {
    return <Spinner />;
  }

  return (
    <>
      {artist && (
        <Box
          bg=" linear-gradient(180deg, rgba(252,245,233,0.1) 500px, rgba(255,255,255,1) 1000px), url('/images/annie-spratt-7Ajvv-KOi20-unsplash.jpg') no-repeat"
          bgSize="100%"
          bgColor="white"
        >
          <Container maxW="container.lg" py={{ sm: 4, md: 10 }}>
            <Box m="auto" mb={10} w={{ base: "70%", md: "md" }}>
              <ArtistContent artist={artist}>
                <ReachLink to="/artist/edit">
                  <Button
                    bg="gray.900"
                    colorScheme="gray"
                    color="white"
                    px={16}
                    my={4}
                  >
                    Edit
                  </Button>
                </ReachLink>{" "}
              </ArtistContent>
            </Box>
            <Tabs
              boxShadow="base"
              rounded="md"
              bg="white"
              isFitted
              variant="enclosed"
            >
              <TabList>
                <Tab
                  fontWeight="bold"
                  color="gray.600"
                  _selected={{
                    border: 0,
                    borderBottom: "2px",
                    borderColor: "gray.400",
                  }}
                >
                  Portfolio
                </Tab>
                <Tab
                  fontWeight="bold"
                  color="gray.600"
                  _selected={{
                    border: 0,
                    borderBottom: "2px",
                    borderColor: "gray.400",
                  }}
                >
                  Booking requests
                </Tab>
                <Tab
                  fontWeight="bold"
                  color="gray.600"
                  _selected={{
                    border: 0,
                    borderBottom: "2px",
                    borderColor: "gray.400",
                  }}
                >
                  Flashes
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Heading
                    color="gray.700"
                    my={10}
                    as="h2"
                    fontSize="4xl"
                    fontWeight="black"
                  >
                    Create your portfolio
                  </Heading>
                  {!!artist.portfolioImages.length && (
                    <ArtistImages artist={artist} setArtist={setArtist} />
                  )}
                  <Box
                    h={{ base: "100px", md: "150px" }}
                    p={3}
                    bg="white"
                    border="1px dashed"
                    borderColor="gray.400"
                    m={4}
                  >
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isUploading ? (
                        <Spinner />
                      ) : (
                        <Text color="gray.500" pt={10}>
                          Drag & drop your images here
                        </Text>
                      )}
                    </div>
                  </Box>
                  <Button
                    isLoading={isSaving}
                    colorScheme="pink"
                    onClick={saveImages}
                  >
                    Save Collection
                  </Button>
                </TabPanel>
                <TabPanel>
                  <RequestContainer requests={artist.requestsReceived} />
                </TabPanel>
                <TabPanel>
                  <Flex justify="center" align="center" minH="250px">
                    <Text
                      color="gray.900"
                      fontSize="4xl"
                      textTransform="uppercase"
                      fontWeight="black"
                    >
                      coming soon
                    </Text>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
          <ToastContainer />
        </Box>
      )}
    </>
  );
}

export default ArtistDashboard;

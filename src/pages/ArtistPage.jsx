import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ArtistContent from "../components/ArtistContent";

import { AuthContext } from "../context/auth.context";
import useAxios from "../utils/axios.hook";
import { Link as ReachLink } from "react-router-dom";
import ArtistImages from "../components/ArtistImages";
import AddFavorite from "../components/AddFavorite";
import ArtistImagesPublic from "../components/ArtistImagesPublic";

function ArtistPage() {
  const [artist, setArtist] = useState();
  const { artistId } = useParams();
  const { apiClient } = useAxios();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  const getUser = () => {
    apiClient.get(`/api/profile/${user._id}`).then((response) => {
      console.log(response.data);
      setUserData(response.data);
    });
  };

  const getArtist = () => {
    apiClient.get(`/api/artist/${artistId}`).then((response) => {
      console.log(response.data);
      setArtist(response.data);
    });
  };

  useEffect(() => {
    getArtist();
    getUser();
  }, []);

  if (!artist) {
    return <Spinner />;
  }

  return (
    <>
      {artist && (
        <Box
          bg=" linear-gradient(180deg, rgba(252,245,233,0.1) 400px, rgba(255,255,255,1) 1000px), url('/images/annie-spratt-gv1I7bYLLDI-unsplash.jpg') no-repeat"
          bgSize="100%"
          bgColor="white"
        >
          <Container maxW="container.lg" py={{ sm: 4, md: 10 }}>
            <Box m="auto" mb={10} w={{ base: "70%", md: "md" }}>
              <ArtistContent artist={artist}>
                <Flex gap={6} justify="center" align="center">
                  <ReachLink to={`/requests/${artist._id}/create`}>
                    <Button colorScheme="pink" px={16} my={4}>
                      Book
                    </Button>
                  </ReachLink>
                  <AddFavorite artist={artist} user={userData} />
                </Flex>
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
                  Tattoo Portfolio
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
                  Available Flashes
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {!!artist.portfolioImages.length && (
                    <ArtistImagesPublic artist={artist} />
                  )}
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
        </Box>
      )}
    </>
  );
}

export default ArtistPage;

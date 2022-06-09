import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArtistSearch from "../components/ArtistSearch";
import ArtistCard from "../components/ArtistCard";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

function AllArtistsPage() {
  const [artist, setArtist] = useState([]);
  const [filteredArtist, setFilteredArtist] = useState([]);

  const allArtists = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/artist`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setArtist(response.data);
      setFilteredArtist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allArtists();
  }, []);

  const filterArtist = (e) => {
    let filteredArtist = artist.filter((artist) =>
      artist.styles.includes(e.target.value)
    );
    setFilteredArtist(filteredArtist);
  };
  console.log(filteredArtist);

  return (
    <>
      {filteredArtist && (
        <Box flexGrow={1} bg="white">
          <Container maxW="container.sm">
            <Heading
              letterSpacing="wide"
              color="gray.700"
              fontSize={{ base: "4xl", md: "7xl" }}
              fontWeight="black"
              mt={{ base: 8, md: 10 }}
              mb={1}
              as="h1"
            >
              Explore Artists
            </Heading>
            <Text mb={4} color="gray.500" fontSize="20px">
              by style
            </Text>
            <ArtistSearch filteredArtist={filterArtist} />
          </Container>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            flexWrap="wrap"
            alignItems="center"
            mx={{ base: 2, md: 20 }}
            my={{ base: 6, md: 10 }}
            gap={{ base: "10px", md: "70px" }}
          >
            {filteredArtist.map((artists) => {
              return <ArtistCard key={artist._id} artist={artists} />;
            })}
          </Flex>
        </Box>
      )}
    </>
  );
}

export default AllArtistsPage;

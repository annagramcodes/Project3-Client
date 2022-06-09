import React from "react";
import { Link as ReachLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Image,
  Link,
  Box,
  Heading,
  Button,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import useAxios from "../utils/axios.hook";
import RequestContainer from "../components/RequestContainer";
import FavoriteList from "../components/FavoriteList";

function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { apiClient } = useAxios();

  const [userData, setUserData] = useState();

  useEffect(() => {
    apiClient.get(`/api/profile/${user._id}`).then((response) => {
      console.log(response.data);
      setUserData(response.data);

      console.log(userData);
    });
  }, []);

  return (
    <Box
      flexGrow={1}
      bg="rgba(0,0,0, 0.1) url('/images/christer-ehrling-fie1PWHWeUo-unsplash.jpg') no-repeat"
      filter="grayscale(40%)"
      backgroundBlendMode="lighten"
      bgSize="100%"
    >
      {isLoggedIn && (
        <Container mt={12}>
          <Box
            bg="white"
            p={4}
            boxShadow="base"
            borderTopRadius="0.375rem"
            display="flex"
            flexDir={{ base: "column-reverse", md: "row-reverse" }}
            justifyContent="center"
            gap={{ base: "50px", md: "100px" }}
            alignItems="center"
          >
            <Box>
              <Heading color="gray.800" as="h2" py={4} size="xl">
                Hello {user.username}!
              </Heading>
              <ReachLink to={`/profile/edit/${user._id}`}>
                <Button
                  bg="gray.700"
                  colorScheme="gray"
                  color="white"
                  px={14}
                  my={4}
                >
                  Edit Profile
                </Button>
              </ReachLink>
            </Box>
            <Image
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
              src={user.imageUrl}
              alt=""
            />
          </Box>
        </Container>
      )}
      <Container mb={10}>
        <Tabs
          boxShadow="base"
          borderBottomRadius="0.375rem"
          bg="white"
          isFitted
          variant="enclosed"
          pt={2}
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
              My Requests:
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
              Favorite Artists
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {userData && userData.requestsMade.length > 0 ? (
                <RequestContainer requests={userData.requestsMade} />
              ) : null}
            </TabPanel>
            <TabPanel>
              <Flex justify="space-evenly" gap={4} flexWrap="wrap">
                {userData && userData.favoriteArtists.length > 0 ? (
                  <FavoriteList favourites={userData.favoriteArtists} />
                ) : null}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

export default ProfilePage;

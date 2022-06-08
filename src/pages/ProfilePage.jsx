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
      bg="rgba(0,0,0, 0.1) url('/images/james-discombe-06o01CtKjGw-unsplash.jpg') no-repeat"
      backgroundBlendMode="screen"
      bgSize="100%"
    >
      {isLoggedIn && (
        <Container pb={8} mt={12}>
          <Box
            bg="white"
            p={4}
            boxShadow="base"
            rounded="md"
            display="flex"
            flexDir={{ base: "column-reverse", md: "row-reverse" }}
            justifyContent="center"
            gap={4}
            alignItems="center"
          >
            <Box>
              <Heading as="h2" py={3} size="xl">
                Hello {user.username}!
              </Heading>
              <Link as={ReachLink} to={`/profile/edit/${user._id}`}>
                <Button
                  bg="gray.900"
                  colorScheme="gray"
                  color="white"
                  px={16}
                  my={4}
                >
                  Edit Profile
                </Button>
              </Link>
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
          rounded="md"
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
              {userData && userData.favoriteArtists.length > 0 ? (
                <FavoriteList favourites={userData.favoriteArtists} />
              ) : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

export default ProfilePage;

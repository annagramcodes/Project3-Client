import React from "react";
import { Link as ReachLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Image, Link, Box, Heading, Button, Container } from "@chakra-ui/react";
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
    <Box flexGrow={1}>
      {isLoggedIn && (
        <Container>
          <Box
            display="flex"
            flexDir={{ base: "column-reverse", md: "row-reverse" }}
            justifyContent="center"
            mt="2"
            gap={4}
            alignItems="center"
          >
            <Box w="">
              <Heading as="h2" py={3} size="xl">
                Welcome {user.username}
              </Heading>
              <Link as={ReachLink} to={`/profile/edit/${user._id}`}>
                <Button>Edit Profile</Button>
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
          {userData && userData.requestsMade.length > 0 ? (
            <RequestContainer requests={userData.requestsMade} />
          ) : null}
          {userData && userData.favoriteArtists.length > 0 ? (
            <FavoriteList favourites={userData.favoriteArtists} />
          ) : null}
        </Container>
      )}
    </Box>
  );
}

export default ProfilePage;

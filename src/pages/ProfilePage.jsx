import React from "react";
import { Link as ReachLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Image, Link, Box, Heading, Button, Container } from "@chakra-ui/react";
import useAxios from "../utils/axios.hook";
import RequestContainer from "../components/RequestContainer";

function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { apiClient } = useAxios();

  const [userData, setUserData] = useState();

  useEffect(() => {
    apiClient.get(`/api/profile/${user._id}`).then((response) => {
      setUserData(response.data);
      console.log(userData);
    });
  }, []);

  return (
    <>
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
          {/* <RequestContainer requests={userData.requestsMade} /> */}
        </Container>
      )}
    </>
  );
}

export default ProfilePage;

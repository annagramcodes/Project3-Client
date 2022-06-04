import React from "react";
import { Link as ReachLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Image, Link, Box, Heading, Button, Container } from "@chakra-ui/react";

function ProfilePage() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && (
        <Container>
          <Link as={ReachLink} to="/">
            <button>Homepage</button>
          </Link>
          <button onClick={logoutUser}>Logout</button>
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
        </Container>
      )}
    </>
  );
}

export default ProfilePage;

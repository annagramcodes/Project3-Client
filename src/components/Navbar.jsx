import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link as ReachLink } from "react-router-dom";
import logo from "../images/tattoo-studio.png";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const {
    isLoggedIn,
    user, // <== UPDATE
    logoutUser, // <== UPDATE
  } = useContext(AuthContext);

  return (
    <Flex
      position="relative"
      boxShadow="md"
      px={12}
      py={2}
      bg="white"
      justifyContent="space-between"
      gap={4}
      align="center"
    >
      <HStack spacing={4}>
        <ReachLink to="/">
          <Image w="50px" src={logo} />
        </ReachLink>

        {isLoggedIn && (
          <ReachLink to="/artist">
            <Button color="gray.900" variant="link">
              Find an Artist
            </Button>
          </ReachLink>
        )}
      </HStack>
      <HStack spacing={4}>
        {isLoggedIn && (
          <>
            <ReachLink to="/profile">
              <Button color="gray.900" variant="link">
                Profile
              </Button>
            </ReachLink>

            {user.profileType === "artist" && (
              <ReachLink to="/dashboard">
                <Button color="gray.900" variant="link">
                  {" "}
                  Dashboard
                </Button>
              </ReachLink>
            )}

            <Button color="gray.900" variant="link" onClick={logoutUser}>
              Logout
            </Button>

            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <ReachLink to="/signup">
              <Button color="gray.900" variant="link">
                Sign Up
              </Button>
            </ReachLink>
            <ReachLink to="/login">
              <Button color="gray.900" variant="link">
                Login
              </Button>
            </ReachLink>
          </>
        )}
      </HStack>
    </Flex>
  );
}

export default Navbar;

import { Button, Flex, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link as ReachLink } from "react-router-dom";

function Navbar() {
  const {
    isLoggedIn,
    user, // <== UPDATE
    logoutUser, // <== UPDATE
  } = useContext(AuthContext);

  return (
    <Flex p={4} bg="gray.100" align="center" gap={4} mb={4} justify="center">
      <ReachLink to="/">
        <Button variant="link">Home</Button>
      </ReachLink>

      {isLoggedIn && (
        <>
          <ReachLink to="/profile">
            <Button variant="link">Profile</Button>
          </ReachLink>

          {user.profileType === "artist" && (
            <ReachLink to="/dashboard">
              <Button variant="link"> Dashboard</Button>
            </ReachLink>
          )}

          <Button variant="link" onClick={logoutUser}>
            Logout
          </Button>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <ReachLink to="/signup">
            <Button variant="link">Sign Up</Button>
          </ReachLink>
          <ReachLink to="/login">
            <Button variant="link">Login</Button>
          </ReachLink>
        </>
      )}
    </Flex>
  );
}

export default Navbar;

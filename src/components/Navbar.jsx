import { Button, Flex, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link as ReachLink } from "react-router-dom";

function Navbar() {
  const {
    isLoggedIn,
    user, // <== UPDATE
    logOutUser, // <== UPDATE
  } = useContext(AuthContext);
  console.log(user);
  return (
    <Flex p={4} bg="teal.100" align="center" gap={4} mb={4} justify="center">
      <ReachLink to="/">
        <Button variant="link">Home</Button>
      </ReachLink>

      {isLoggedIn && (
        <>
          <ReachLink to="/profile">
            <Button variant="link">Profile</Button>
          </ReachLink>

          {/* FIXME: FIx Authorization Error */}

          {user.profileType === "artist" && (
            <ReachLink to="/artist">Artist</ReachLink>
          )}

          <Button variant="link" onClick={logOutUser}>
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

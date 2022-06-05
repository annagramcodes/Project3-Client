import { Link } from "@chakra-ui/react";
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
    <nav>
      <ReachLink to="/">Home</ReachLink>

      {isLoggedIn && (
        <>
          <ReachLink to="/profile">Profile</ReachLink>

          {/* FIXME: FIx Authorization Error */}

          {user.profileType === "artist" && (
            <ReachLink to="/artist">Artist</ReachLink>
          )}
          <Link>
            <button onClick={logOutUser}>Logout</button>
          </Link>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <ReachLink to="/signup">Sign Up</ReachLink>
          <ReachLink to="/login">Login</ReachLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;

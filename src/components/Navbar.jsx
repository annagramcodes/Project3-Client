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
          <ReachLink to="/signup">
            <Link>Sign Up</Link>
          </ReachLink>
          <ReachLink to="/login">
            <Link>Login</Link>
          </ReachLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;

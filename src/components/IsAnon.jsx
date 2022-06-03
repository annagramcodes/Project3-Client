import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    return children;
  } else {
    return navigate("/");
  }
}

export default IsAnon;

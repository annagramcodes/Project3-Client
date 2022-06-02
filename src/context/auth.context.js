import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logoutUser = () => {
    removeToken();
    authenticateUser();
  };

  const getToken = () => {
    console.log(localStorage.getItem("authToken"));
    return localStorage.getItem("authToken");
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(response.data);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logoutUser,
        getToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };

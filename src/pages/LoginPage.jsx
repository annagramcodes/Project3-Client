import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  Input,
  FormControl,
  FormLabel,
  VStack,
  Button,
  Container,
} from "@chakra-ui/react";
import axios from "axios";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, user, authenticateUser } = useContext(AuthContext);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        storeToken(response.data.authToken);

        authenticateUser();
        navigate("/dashboard");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <Container className="LoginPage">
      <h1>Login</h1>
      <VStack>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </FormControl>

          <Button type="submit">Login</Button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Don't have an account?</p>
        <Link to="/signup"> Sign up</Link>
      </VStack>
    </Container>
  );
}

export default LoginPage;

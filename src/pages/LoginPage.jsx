import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import {
  Input,
  FormControl,
  FormLabel,
  VStack,
  Button,
  Container,
  Link,
  Text,
  Flex,
  Heading,
  Box,
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
    // <Box

    //   bgSize="100%"
    //   bgImage="url('/images/kristian-angelo-xyJZvUL4_TY-unsplash.jpg')"
    // >
    <Flex
      // pt={20}
      flexGrow={1}
      justify="center"
      alignItems="center"
      className="LoginPage"
      bgSize="100%"
      bgImage="url('/images/kristian-angelo-xyJZvUL4_TY-unsplash.jpg')"
    >
      <VStack>
        <Heading
          color="whiteAlpha.900"
          as="h1"
          fontWeight="black"
          textTransform="uppercase"
          mb={4}
        >
          Login
        </Heading>
        <Box p={8} w="xs" bg="white" rounded="lg">
          <form onSubmit={handleSubmit}>
            <FormControl py={3}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl pb={3}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </FormControl>
            <Button
              bg="gray.900"
              colorScheme="gray"
              color="white"
              px={16}
              my={4}
              type="submit"
            >
              Login
            </Button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Box>

        <Text color="white" fontSize="sm">
          Don't have an account?{" "}
          <ReachLink to="/signup">
            <Link fontWeight="semibold">Sign up</Link>
          </ReachLink>
        </Text>
      </VStack>
    </Flex>
    // </Box>
  );
}

export default LoginPage;

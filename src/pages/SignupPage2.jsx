import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function SignupPage() {
  const { authenticateUser, storeToken } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(undefined);

  const onSubmit = (data) => {
    const { username, password, email, profileType } = data;
    const body = { username, password, email, profileType };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, body)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        if (profileType === "artist") {
          navigate("/signup-artist");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <Flex
      flexGrow={1}
      justify="center"
      alignItems="center"
      className="LoginPage"
      bgSize="100%"
      bgImage="url('/images/eugene-chystiakov-w8fulqCkj8w-unsplash.jpg')"
    >
      <VStack mb={{ base: 3, md: 8 }}>
        <Heading
          mt={{ base: 8, md: 14 }}
          color="white"
          as="h1"
          fontSize="5xl"
          fontWeight="black"
          textTransform="uppercase"
          mb={4}
        >
          Sign Up
        </Heading>
        <Box p={8} w="xs" bg="white" rounded="lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl pb={3} isInvalid={errors.username}>
              <FormLabel htmlFor="username">Name</FormLabel>
              <Input
                type="text"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="text" {...register("email", { required: true })} />
            </FormControl>

            <FormControl pb={3} isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                {...register("password", { required: true })}
              />
            </FormControl>
            <FormControl isInvalid={errors.profileType}>
              <FormLabel htmlFor="client">
                Are you a client or artist?
              </FormLabel>
              <RadioGroup pb={3}>
                <HStack spacing="24px">
                  <Radio
                    value="client"
                    {...register("profileType", { required: true })}
                  >
                    Client
                  </Radio>
                  <Radio
                    value="artist"
                    {...register("profileType", { required: true })}
                  >
                    Artist
                  </Radio>
                </HStack>
              </RadioGroup>
              {errors.profileType && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>
            <Button
              bg="gray.900"
              colorScheme="gray"
              color="white"
              px={16}
              my={4}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Box>

        <Text color="white" fontSize="md">
          Already have an account?{" "}
          <ReachLink to="/login">
            <Link fontWeight="semibold">Login</Link>
          </ReachLink>
        </Text>
      </VStack>
    </Flex>
  );
}

export default SignupPage;

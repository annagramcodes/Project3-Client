import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  Radio,
  RadioGroup,
  Button,
  Input,
  FormControl,
  FormLabel,
  HStack,
  FormErrorMessage,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

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
    <Container maxW="md">
      <div className="SignupPage">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">Name</FormLabel>
            <Input type="text" {...register("username", { required: true })} />
            {errors.username && (
              <FormErrorMessage>Required field.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="text" {...register("email", { required: true })} />
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              {...register("password", { required: true })}
            />
          </FormControl>
          <FormControl isInvalid={errors.profileType}>
            <FormLabel htmlFor="client">Are you an Artist or Client?</FormLabel>
            <RadioGroup>
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
          <Button type="submit">Sign Up</Button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Already have an account?</p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </Container>
  );
}

export default SignupPage;

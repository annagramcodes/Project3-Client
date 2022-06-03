import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

function ArtistSignUp() {
  const { authenticateUser, logoutUser, storeToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(undefined);

  const onSubmit = (data) => {
    const {
      name,
      location,
      styles,
      // flashes: { price, size, estimatedTime, imageUrl },
      portfolioImages,
    } = data;
    const body = {
      name,
      location,
      styles,
      // flashes: { price, size, estimatedTime, imageUrl },
      portfolioImages,
    };
    console.log(body);

    const getToken = localStorage.getItem("authToken");
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/artist`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <Container maxW="md">
      <VStack spacing={1}>
        <h1> Tell us about your art </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input type="text" {...register("name", { required: true })} />
            {errors.name && (
              <FormErrorMessage>Required field.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.location}>
            <FormLabel htmlFor="location">Location:</FormLabel>
            <Input type="text" {...register("location", { required: true })} />
            {errors.location && (
              <FormErrorMessage>Required field.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.businessHours}>
            <FormLabel htmlFor="businessHours">Business Hours:</FormLabel>
            <Input
              type="text"
              {...register("businessHours", { required: true })}
            />
            {errors.location && (
              <FormErrorMessage>Required field.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errors.styles}>
            <FormLabel htmlFor="styles">Which styles do you tattoo?</FormLabel>
            <Input type="text" {...register("styles", { required: true })} />

            {errors.styles && (
              <FormErrorMessage>Required field.</FormErrorMessage>
            )}
          </FormControl>
          <Button type="submit">Create Artist Account</Button>
        </form>
      </VStack>
    </Container>
  );
}

export default ArtistSignUp;

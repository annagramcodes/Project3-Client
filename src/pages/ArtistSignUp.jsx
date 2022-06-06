import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/axios.hook";

function ArtistSignUp() {
  const { apiClient } = useAxios();

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
      businessHours,
      // flashes: { price, size, estimatedTime, imageUrl },
      portfolioImages,
    } = data;
    const body = {
      name,
      location,
      styles,
      businessHours,
      // flashes: { price, size, estimatedTime, imageUrl },
      portfolioImages,
    };
    console.log(body);

    apiClient
      .post(`/api/artist`, body)
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
            {errors.businessHours && (
              <FormErrorMessage>Required field.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.styles}>
            <FormLabel htmlFor="styles">Which styles do you tattoo?</FormLabel>
            <CheckboxGroup {...register("styles")} colorScheme="pink">
              <Flex flexWrap="wrap" gap={[1, 5]} direction={["column", "row"]}>
                <Checkbox {...register("styles")} value="blackwork">
                  Blackwork
                </Checkbox>
                <Checkbox {...register("styles")} value="chicano">
                  Chicano
                </Checkbox>
                <Checkbox {...register("styles")} value="dotwork">
                  Dotwork
                </Checkbox>
                <Checkbox {...register("styles")} value="realism">
                  Realism
                </Checkbox>
                <Checkbox {...register("styles")} value="fineline">
                  Fineline
                </Checkbox>
                <Checkbox {...register("styles")} value="old-school">
                  Old School
                </Checkbox>
                <Checkbox {...register("styles")} value="new-school">
                  New School
                </Checkbox>
                <Checkbox {...register("styles")} value="hand-poked">
                  Hand-Poked
                </Checkbox>
                <Checkbox {...register("styles")} value="geometric">
                  Geometric
                </Checkbox>
                <Checkbox {...register("styles")} value="surrealism">
                  Surrealism
                </Checkbox>
                <Checkbox {...register("styles")} value="lettering">
                  Lettering
                </Checkbox>
                <Checkbox {...register("styles")} value="watercolor">
                  Watercolor
                </Checkbox>
                <Checkbox {...register("styles")} value="other">
                  Other
                </Checkbox>
              </Flex>
            </CheckboxGroup>

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

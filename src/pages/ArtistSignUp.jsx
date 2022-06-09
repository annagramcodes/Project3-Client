import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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

      portfolioImages,
    } = data;
    const body = {
      name,
      location,
      styles,
      businessHours,
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
    <Flex
      flexGrow={1}
      justify="center"
      alignItems="center"
      className="LoginPage"
      bgSize="100%"
      bgImage="url('/images/annie-spratt-gv1I7bYLLDI-unsplash.jpg')"
    >
      <VStack mt={12} mb={8} spacing={5} minW="400px">
        <Heading
          color="white"
          as="h1"
          fontSize="4xl"
          fontWeight="black"
          textTransform="uppercase"
          mb={4}
        >
          Tell us about your Workspace
        </Heading>
        <Box mb={5} p={8} w="md" bg="white" rounded="lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl pb={3} isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input type="text" {...register("name", { required: true })} />
              {errors.name && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl pb={3} isInvalid={errors.location}>
              <FormLabel htmlFor="location">Location:</FormLabel>
              <Input
                type="text"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl pb={3} isInvalid={errors.businessHours}>
              <FormLabel htmlFor="businessHours">Business Hours:</FormLabel>
              <Input
                type="text"
                {...register("businessHours", { required: true })}
              />
              {errors.businessHours && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl pb={3} isInvalid={errors.styles}>
              <FormLabel htmlFor="styles">
                Which styles do you tattoo?
              </FormLabel>
              <CheckboxGroup {...register("styles")} colorScheme="pink">
                <Flex
                  flexWrap="wrap"
                  gap={[1, 1.5]}
                  direction={["column", "row"]}
                >
                  <Checkbox {...register("styles")} value="blackwork">
                    Blackwork
                  </Checkbox>
                  <Checkbox {...register("styles")} value="chicano">
                    Chicano
                  </Checkbox>
                  <Checkbox {...register("styles")} value="dotwork">
                    Dotwork
                  </Checkbox>
                  <Checkbox {...register("styles")} value="fineline">
                    Fineline
                  </Checkbox>

                  <Checkbox {...register("styles")} value="geometric">
                    Geometric
                  </Checkbox>
                  <Checkbox {...register("styles")} value="hand-poked">
                    Hand-Poked
                  </Checkbox>
                  <Checkbox {...register("styles")} value="lettering">
                    Lettering
                  </Checkbox>
                  <Checkbox {...register("styles")} value="new-school">
                    New School
                  </Checkbox>
                  <Checkbox {...register("styles")} value="old-school">
                    Old School
                  </Checkbox>
                  <Checkbox {...register("styles")} value="realism">
                    Realism
                  </Checkbox>
                  <Checkbox {...register("styles")} value="surrealism">
                    Surrealism
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
            <Button
              bg="gray.900"
              colorScheme="gray"
              color="white"
              px={16}
              mt={4}
              type="submit"
            >
              Create Artist Account
            </Button>
          </form>
        </Box>
      </VStack>
    </Flex>
  );
}

export default ArtistSignUp;

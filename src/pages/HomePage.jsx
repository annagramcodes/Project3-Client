import { CalendarIcon, EmailIcon, Search2Icon } from "@chakra-ui/icons";
import { IconContext } from "react-icons";
import { Icon } from "@chakra-ui/react";
import { RiHeartFill } from "react-icons/ri";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import image1 from "../images/luis-villasmil-Y6TOX6LnIGs-unsplash.jpg";
import image2 from "../images/allef-vinicius-vKIc4k6dm10-unsplash.jpg";
import image3 from "../images/lucas-lenzi-zeT_i6av9rU-unsplash.jpg";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { user, isLoggedIn } = useContext(AuthContext);
  return (
    <Box flexGrow={1}>
      <Flex
        mb={{ base: "50px", md: "100px" }}
        justify="center"
        alignItems="center"
        flexDirection="column"
        w="100%"
        minH="80vh"
        bg="rgba(0,0,0,0.3) url('/images/maria-oswalt-FAnM_Vqs-N0-unsplash.jpg') no-repeat center"
        backgroundBlendMode="darken"
        bgSize={{ base: "stretch", md: "100%" }}
      >
        <Box>
          <Heading
            pt="6rem"
            letterSpacing="wide"
            fontWeight="black"
            as="h1"
            color="white"
            fontSize={{ base: "5xl", md: "7xl" }}
          >
            Tatuadores Lisboa
          </Heading>
          <Text
            letterSpacing="wide"
            fontSize={{ base: "sm", md: "xl" }}
            color="white"
            pb={{ base: "2rem" }}
          >
            Find tattoo artists in Lisbon!
          </Text>
          <ReachLink to={isLoggedIn ? "/artist" : "/login"}>
            <Button
              textTransform="uppercase"
              size="md"
              bg="white"
              px={20}
              my={8}
              color="gray.700"
              fontWeight="bold"
            >
              Explore
            </Button>
          </ReachLink>
        </Box>
      </Flex>
      <Flex
        px={{ base: "2rem", md: "10rem" }}
        flexDirection={{ base: "column-reverse", md: "row" }}
        gap={{ base: "1rem", md: "6rem" }}
        w="100%"
        minH="60vh"
        mb={{ base: "50px", md: "150px" }}
      >
        <Image
          pb={{ base: "30px", md: "150px" }}
          objectFit="contain"
          w={{ base: "xs", md: "xl" }}
          src={image1}
        />
        <Box textAlign="left">
          <Heading mb="2rem" as="h2" fontSize="4xl" fontWeight="black">
            How it works
          </Heading>
          <Flex gap={4}>
            <Box mb="2rem">
              <Search2Icon w={8} h={8} />
            </Box>
            <Box mb="2rem">
              <Heading as="h3" fontSize="2xl" fontWeight="bold">
                Find Artists
              </Heading>
              <Text color="gray.600" fontSize="xl">
                Looking for a tattoo artist in Lisbon? Use our Website to find
                them.
              </Text>
            </Box>
          </Flex>
          <Flex gap={6}>
            <Box mb="2rem">
              <Icon as={RiHeartFill} w={8} h={8} />
            </Box>
            <Box mb="2rem" mr="-5px">
              <Heading as="h3" fontSize="2xl" fontWeight="bold">
                Add favorites
              </Heading>
              <Text color="gray.600" fontSize="xl">
                Add your favorite Artists, so you can always check them in your
                profile.
              </Text>
            </Box>
          </Flex>
          <Flex gap={4}>
            <Box mb="2rem">
              <CalendarIcon w={8} h={8} />
            </Box>
            <Box mb="2rem">
              <Heading as="h3" fontSize="2xl" fontWeight="bold">
                Book an appointment
              </Heading>
              <Text color="gray.600" fontSize="xl">
                You can book an appointment and get in contact with the artist.
              </Text>
            </Box>
          </Flex>
          <ReachLink to={isLoggedIn ? "/profile" : "/signup"}>
            <Button
              size="lg"
              bg="gray.900"
              colorScheme="gray"
              color="white"
              px={20}
              my={{ base: 0, md: 4 }}
              mx={{ base: "14%", md: 0 }}
            >
              Sign up
            </Button>
          </ReachLink>
        </Box>
      </Flex>
      <Flex
        px={{ base: "2rem", md: "12rem" }}
        flexDirection={{ base: "column-reverse", md: "row-reverse" }}
        gap={{ base: "1rem", md: "4rem" }}
        w="100%"
        minH="60vh"
        mb={{ base: "50px", md: "100px" }}
      >
        <Image w="xl" src={image3} />
        <Flex
          pr={4}
          alignItems="flex-start"
          justify="center"
          flexDirection="column"
          textAlign="left"
        >
          <Heading mb="1rem" as="h2" fontSize="3xl" fontWeight="bold">
            Find Artists in Lisbon
          </Heading>
          <Text color="gray.600" fontSize="2xl">
            Our Webapp features the best tattoo artists in Libon. Find one for
            your next project.
          </Text>

          <ReachLink to={isLoggedIn ? "/artist" : "/login"}>
            <Button
              size="lg"
              colorScheme="pink"
              px={20}
              my={8}
              fontWeight="bold"
              mx={{ base: "16%", md: 0 }}
            >
              Explore
            </Button>
          </ReachLink>
        </Flex>
      </Flex>
    </Box>
  );
}

export default HomePage;

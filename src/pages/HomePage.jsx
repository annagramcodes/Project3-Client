import { CalendarIcon, EmailIcon, Search2Icon } from "@chakra-ui/icons";
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
import React from "react";
import image1 from "../images/luis-villasmil-Y6TOX6LnIGs-unsplash.jpg";
import image2 from "../images/allef-vinicius-vKIc4k6dm10-unsplash.jpg";
import image3 from "../images/lucas-lenzi-zeT_i6av9rU-unsplash.jpg";

function HomePage() {
  return (
    <Box flexGrow={1}>
      <Flex
        mb={{ base: "50px", md: "100px" }}
        justify="center"
        alignItems="center"
        flexDirection="column"
        w="100%"
        minH="80vh"
        bgSize="cover"
        objectFit="contain"
        bgImage="url('/images/maria-oswalt-FAnM_Vqs-N0-unsplash.jpg')"
      >
        <Box>
          <Heading
            pt={10}
            letterSpacing="wide"
            fontWeight="black"
            as="h1"
            color="white"
            fontSize="7xl"
          >
            Tatuadores Lisboa
          </Heading>
          <Text fontSize="2xl" color="white">
            Find an Artist for your next project!
          </Text>
          <ReachLink to="/artist">
            <Button
              size="md"
              variant="outline"
              colorScheme="pink"
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
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "4rem", md: "8rem" }}
        w="100%"
        minH="60vh"
        mb={{ base: "50px", md: "150px" }}
      >
        <Image boxSize="lg" src={image1} />
        <Box textAlign="left">
          <Heading mb="3rem" as="h2" fontSize="4xl" fontWeight="black">
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
                Lorem, ipsum dolor sit amet consectetur.
              </Text>
            </Box>
          </Flex>
          <Flex gap={6}>
            <Box mb="2rem">
              <EmailIcon w={7} h={7} />
            </Box>
            <Box mb="2rem">
              <Heading as="h3" fontSize="2xl" fontWeight="bold">
                Make contact
              </Heading>
              <Text color="gray.600" fontSize="xl">
                Lorem, ipsum dolor sit amet consectet elit.{" "}
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
                Lorem, ipsum dolor amet consectetur adipisicing elit.{" "}
              </Text>
            </Box>
          </Flex>
          <ReachLink to="/sign-up">
            <Button
              size="md"
              bg="gray.900"
              colorScheme="gray"
              color="white"
              px={20}
              my={8}
            >
              Sign up
            </Button>
          </ReachLink>
        </Box>
      </Flex>
      <Flex
        px={{ base: "2rem", md: "12rem" }}
        flexDirection={{ base: "column-reverse", md: "row-reverse" }}
        gap={{ base: "4rem", md: "4rem" }}
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
            Lorem, ipsum dolor amet consectetur adipisicing.
          </Text>
          <ReachLink to="/artist">
            <Button
              size="md"
              colorScheme="pink"
              px={20}
              my={8}
              fontWeight="bold"
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

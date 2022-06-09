import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/auth.context";
import useAxios from "../utils/axios.hook";

function RequestDetailsPage() {
  const { apiClient } = useAxios();
  const [requests, setRequests] = useState([]);
  const { requestId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const successHandle = () => {
    toast.success("Request accepted succesfully", {
      delay: 1000,
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  const rejectHandle = () => {
    toast.success("Request rejected succesfully", {
      delay: 1000,
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  const getRequests = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/requests/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await apiClient.put(
        `/api/requests/${requests._id}/accept`
      );
      setRequests(response.data);

      navigate("/dashboard");
      successHandle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await apiClient.put(
        `/api/requests/${requests._id}/reject`
      );
      setRequests(response.data);

      navigate("/dashboard");
      rejectHandle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      {requests && (
        <Box
          flexGrow={1}
          bgImage="url('/images/sindy-strife-NXXHvIAzbYk-unsplash.jpg')"
          bgSize={{ base: "cover", md: "100%" }}
          py={{ sm: 4, md: 10 }}
        >
          <Box
            m="auto"
            maxW={{ base: "90%", md: "container.sm" }}
            bg="white"
            boxShadow="base"
            textAlign="left"
            p="8"
            pl="12"
            rounded="md"
          >
            <Heading
              as="h1"
              fontSize="5xl"
              fontWeight="bold"
              pb={{ md: 5 }}
              textAlign="left"
            >
              {requests.title}
            </Heading>
            <Flex gap="50px" flexDirection={{ base: "column", md: "row" }}>
              <Box mb={7} textAlign="left">
                <Text mb={2}>
                  {" "}
                  <b> Placement:</b> {requests.placement}
                </Text>
                <Text mb={2}>
                  {" "}
                  <b> Budget: </b> ${requests.budget}
                </Text>
                <Text mb={2}>
                  <b> Color choice: </b>{" "}
                  {requests.color ? "Color" : "Black and White"}
                </Text>
                <Heading fontSize="md" as="h6">
                  Description:
                </Heading>
                <Text mb={2}>{requests.description}</Text>
                <Text mb={2}>
                  <b> Appointment Date: </b>{" "}
                  {new Date(requests.appointmentDate).toLocaleString("en-US")}
                </Text>
              </Box>
            </Flex>
            <Flex flexWrap="wrap" gap={7}>
              {requests.imagesUrl?.map((imageUrl) => (
                <Image
                  src={imageUrl}
                  boxSize="150px"
                  rounded="md"
                  m="0"
                  objectFit="cover"
                  alt="tattoo"
                />
              ))}
            </Flex>
            <Flex pt={12} gap={5} justifyContent="center">
              {user.profileType === "artist" && (
                <Button size="md" colorScheme="green" onClick={handleAccept}>
                  Accept the request
                </Button>
              )}
              {user.profileType === "artist" && (
                <Button colorScheme="red" onClick={handleReject}>
                  Reject the request
                </Button>
              )}
              {/* <ToastContainer /> */}
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}

export default RequestDetailsPage;

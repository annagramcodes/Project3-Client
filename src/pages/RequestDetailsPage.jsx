import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAxios from "../utils/axios.hook";
import {
  Box,
  Link,
  Heading,
  Text,
  Divider,
  Button,
  SimpleGrid,
  Image,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RequestDetailsPage() {
  const { apiClient } = useAxios();
  const [requests, setRequests] = useState([]);
  const { requestId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const successHandle = () => {
    toast.success("Request accepted succesfully", {
      delay: 1000,
      position: "top-center",
      autoClose: 1000,
      closeOnClick: true,
    });
  };

  const rejectHandle = () => {
    toast.success("Request rejected succesfully", {
      delay: 1000,
      position: "top-center",
      autoClose: 1000,
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
        <Container maxW="container.lg" py={{ sm: 4, md: 1 }}>
          <Heading mt={3} as="h6" fontSize="3xl" fontWeight="bold">
            {requests.title}
          </Heading>

          <Text>Placement: {requests.placement}</Text>
          <Text>Budget: {requests.budget}</Text>
          <Text>{requests.color ? "Color" : "Black and White"}</Text>
          <Text>{requests.description}</Text>
          <Text>
            {new Date(requests.appointmentDate).toLocaleString("en-US")}
          </Text>
          <SimpleGrid mb={5} columns={{ base: 2, md: 4 }} spacing={4}>
            {requests.imagesUrl?.map((imageUrl) => (
              <Image
                src={imageUrl}
                position="relative"
                boxSize="300px"
                rounded="md"
                m="0"
                objectFit="cover"
                alt="tattoo"
              />
            ))}
          </SimpleGrid>

          {user.profileType === "artist" && (
            <Button onClick={handleAccept}>Accept the request</Button>
          )}
          {user.profileType === "artist" && (
            <Button onClick={handleReject}>Reject the request</Button>
          )}
          {/* <ToastContainer /> */}
        </Container>
      )}
    </>
  );
}

export default RequestDetailsPage;

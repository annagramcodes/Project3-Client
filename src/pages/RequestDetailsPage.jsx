import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAxios from "../utils/axios.hook";
import { Button } from "@chakra-ui/react";

function RequestDetailsPage() {
  const { apiClient } = useAxios();
  const [requests, setRequests] = useState([]);
  const { requestId } = useParams();

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
      const body = { requestId: requests._id };
      const response = await apiClient.put(
        `/requests/${requests._id}/accept`,
        body
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div>
      <p>{requests.description}</p>
      <p>{requests.placement}</p>
      <Button onClick={handleAccept}>Accept the request</Button>
    </div>
  );
}

export default RequestDetailsPage;

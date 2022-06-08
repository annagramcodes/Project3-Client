import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function RequestDetailsPage() {
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

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div>
      <p>{requests.description}</p>
      <p>{requests.placement}</p>
    </div>
  );
}

export default RequestDetailsPage;

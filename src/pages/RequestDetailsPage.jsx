import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAxios from "../utils/axios.hook";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function RequestDetailsPage() {
  const { apiClient } = useAxios();
  const [requests, setRequests] = useState([]);
  const { requestId } = useParams();
  const navigate = useNavigate();

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

  const handleReject = async () => {
    try {
      const response = await apiClient.get(
        `/api/requests/${requests._id}/reject`
      );
      setRequests(response.data);
      navigate("/dashboard");
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
        <div>
          <p>{requests.description}</p>
          <p>{requests.placement}</p>
          {/* {isLoggedIn && user.profileType === "artist" && (
            <Button onClick={handleReject}>Reject the request</Button>
          )} */}
        </div>
      )}
    </>
  );
}

export default RequestDetailsPage;

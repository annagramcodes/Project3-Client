import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAxios from "../utils/axios.hook";
import { Button } from "@chakra-ui/react";
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
      successHandle();
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
          {user.profileType === "artist" && (
            <Button onClick={handleAccept}>Accept the request</Button>
          )}
          {user.profileType === "artist" && (
            <Button onClick={handleReject}>Reject the request</Button>
          )}
          {/* <ToastContainer /> */}
        </div>
      )}
    </>
  );
}

export default RequestDetailsPage;

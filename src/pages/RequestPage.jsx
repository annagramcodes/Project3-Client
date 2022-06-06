import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RequestPage() {
  const [requests, setRequests] = useState([]);

  const allRequests = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/requests`,
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
    allRequests();
  }, []);

  return (
    <div className="RequestPage">
      {requests.map((request) => {
        return (
          <div key={request._id}>
            <Link to={`/requests/${request._id}`}>
              <p>{request.placement}</p>
              <p>{request.size}</p>
              <p>{request.budget}</p>
              <p>{request.description}</p>
              <p>{request.color ? "Color" : "Black and White"}</p>
              <img src={request.imagesUrl[0]} alt="" />
              <p>{new Date(request.appointmentDate).toLocaleString("en-US")}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default RequestPage;

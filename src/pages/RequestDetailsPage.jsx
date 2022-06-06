import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RequestDetailsPage() {
  const [requests, setRequests] = useState([]);
  const { requestId } = useParams();
  //   let day = requests.appointmentDate.substring(8, 10);
  //   let month = requests.appointmentDate.substring(5, 7);
  //   let year = requests.appointmentDate.substring(0, 4);

  //   let date = new Date(year, month, day);
  //   let shortMonth = date.toLocaleString("en-us", { month: "short" });

  //   let dayOfWeekDig = date.getDay();

  //   let dayOfWeekName = date.toLocaleString("default", { weekday: "long" });

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
      {/* <img src={requests.image} alt="requests-img" className="cover-image" />
      <section className="section-info"> */}
      <p>{requests.description}</p>
      {/* <div className="div-date">
          <div className="div-p">
            <p className="date-info">
              {dayOfWeekName + ", " + day + " " + shortMonth + " " + year}
            </p>
            {/* <p className="time-info">
              {requests.appointmentDate.substring(11, 13) +
                ":" +
                requests.appointmentDate.substring(14, 16) +
                "-" +
                requests.appointmentDate.substring(17, 19) +
                ":" +
                requests.appointmentDate.substring(20, 22)}
            </p> */}
      {/* </div>
        </div>
      </section> */}{" "}
    </div>
  );
}

export default RequestDetailsPage;

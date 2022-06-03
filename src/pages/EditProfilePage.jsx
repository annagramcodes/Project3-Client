import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setUsername(response.data.username);
      setEmail(response.data.email);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  //   const getUser = async () => {
  //     try {
  //       let response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/api/profile/${userId}`
  //       );
  //       setUsername(response.data.username);
  //       setEmail(response.data.email);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const deleteUser = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  });

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleImageUrl = (e) => setImageUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, email, imageUrl };

    // const editUser = async () => {
    //   try {
    const getToken = localStorage.getItem("authToken");
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        setUsername("");
        setEmail("");
        navigate(`/profile`);
      })
      .catch((err) => console.log(err));
    // };
    //     setUsername("");
    //     setEmail("");
    //     navigate(`/profile`);
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  //     axios
  //       .put(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`, body)

  //       .then(() => {
  //         setUsername("");
  //         setEmail("");
  //         navigate(`/profile`);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return (
    <div className="EditProfilePage">
      <h3>Edit the Profile</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label htmlFor="email">Email</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="image">Upload a Photo</label>
        <input
          type="file"
          name="existingImage"
          id="image"
          value={imageUrl}
          onChange={handleImageUrl}
        />

        <button type="submit">Edit</button>
      </form>
      <button onClick={deleteUser}>Delete</button>
    </div>
  );
}

export default EditProfilePage;

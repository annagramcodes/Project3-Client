import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();
  const { authenticateUser, logoutUser, storeToken } = useContext(AuthContext);

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
      logoutUser();
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleImageUrl = (e) => setImageUrl(e.target.value);

  const handleFileUpload = (e) => {
    setIsUploading(true);
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        setIsUploading(false);
        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) {
      alert("Image is uploading");
      return;
    }
    const body = { username, email, imageUrl };

    const getToken = localStorage.getItem("authToken");
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUsername("");
        setEmail("");
        storeToken(response.data.authToken);
        authenticateUser();
        navigate(`/profile`);
      })
      .catch((err) => console.log(err));
  };

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
        <input type="file" onChange={(e) => handleFileUpload(e)} />

        <button type="submit">Edit</button>
      </form>
      <button onClick={deleteUser}>Delete</button>
    </div>
  );
}

export default EditProfilePage;

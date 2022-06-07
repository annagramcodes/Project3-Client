import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Container,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();
  const { authenticateUser, logoutUser, storeToken } = useContext(AuthContext);

  const successHandle = () => {
    toast.success("Yay", {
      position: "top-center",
      autoClose: 1000,
      closeOnClick: true,
    });
  };

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

  // const handleFileUpload = (e) => {
  //   setIsUploading(true);
  //   const uploadData = new FormData();

  //   uploadData.append("imageUrl", e.target.files[0]);

  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
  //     .then((response) => {
  //       setIsUploading(false);
  //       setImageUrl(response.data.fileUrl);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const acceptedFileItems = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isUploading) {
  //     alert("Image is uploading");
  //     return;
  //   }

  const onDrop = async (droppedFiles) => {
    setIsUploading(true);
    const [file] = droppedFiles;
    const uploadData = new FormData();

    uploadData.append("imageUrl", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        setIsUploading(false);
        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log(err));
  };
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) {
      successHandle();
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
        setUsername("");
        setEmail("");
        storeToken(response.data.authToken);
        authenticateUser();
        navigate(`/profile`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="EditProfilePage">
      <Heading as="h2" size="xl">
        Edit your Profile
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="username"> Username:</FormLabel>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="image">Upload a Photo:</FormLabel>
          <Box p={5} bg="gray.100" m={4}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop a file here, or click to select a file</p>
              <ul>{acceptedFileItems}</ul>
            </div>
          </Box>
        </FormControl>
        <Button my={4} type="submit">
          Edit Profile
        </Button>
      </form>
      <Button my={2} onClick={deleteUser}>
        Delete Profile
      </Button>
      <ToastContainer />
    </Container>
  );
}

export default EditProfilePage;

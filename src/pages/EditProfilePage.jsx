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
  VStack,
  Flex,
  ButtonGroup,
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
    <Flex
      flexGrow={1}
      justify="center"
      alignItems="center"
      bg="url('/images/matheus-ferrero-RBsrv4yV5KY-unsplash.jpg')"
      backgroundBlendMode="darken"
      bgPos="top"
      bgSize="100%"
    >
      <VStack mt={12} mb={8} spacing={5} minW="400px">
        <Heading
          color="white"
          as="h1"
          fontSize="5xl"
          fontWeight="black"
          textTransform="uppercase"
          mb={4}
        >
          Edit your Profile
        </Heading>
        <Box mb={5} p={8} w="md" bg="white" rounded="lg">
          <form onSubmit={handleSubmit}>
            <FormControl pb={3}>
              <FormLabel htmlFor="username"> Username:</FormLabel>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={handleUsername}
              />
            </FormControl>
            <FormControl pb={3}>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl pb={3}>
              <FormLabel htmlFor="image">Upload a Photo:</FormLabel>
              <Box p={5} bg="gray.100" m={4}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop a file here, or click to select a file</p>
                  <ul>{acceptedFileItems}</ul>
                </div>
              </Box>
            </FormControl>
            <Flex gap="4" my={4}>
              <Button
                // bg="gray.700"
                variant="outline"
                border="2px"
                colorScheme="gray"
                color="gray.700"
                px={14}
                type="submit"
              >
                Edit Profile
              </Button>
              <Button px={12} colorScheme="red" onClick={deleteUser}>
                Delete Profile
              </Button>
            </Flex>
          </form>
        </Box>
        <ToastContainer />
      </VStack>
    </Flex>
  );
}

export default EditProfilePage;

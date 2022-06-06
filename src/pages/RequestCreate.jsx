import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  Radio,
  RadioGroup,
  Button,
  Input,
  FormControl,
  FormLabel,
  HStack,
  FormErrorMessage,
  Container,
  Textarea,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

function RequestCreate() {
  const { artistId } = useParams();
  console.log(artistId);

  const navigate = useNavigate();
  //const [value, onChange] = useState(new Date());
  const [isUploading, setIsUploading] = useState(false);
  const [placement, setPlacement] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState(true);
  const [budget, setBudget] = useState(0);
  const [imagesUrl, setImagesUrl] = useState([]);

  const handlePlacement = (e) => setPlacement(e.target.value);
  const handleAppointmentDate = (e) => {
    const newDate = new Date(e.target.value);
    setAppointmentDate(newDate.toLocaleString("en-US"));
    console.log(appointmentDate);
  };

  const handleDescription = (e) => setDescription(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  const handleBudget = (e) => setBudget(e.target.value);
  const handleimagesUrl = (e) => setImagesUrl(e.target.value);

  // const handleFilesUpload = (e) => {
  //   setIsUploading(true);
  //   const uploadData = new FormData();

  //   uploadData.append("imagesUrl", e.target.files[0]);

  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/api/uploads`, uploadData)
  //     .then((response) => {
  //       setIsUploading(false);
  //       setImagesUrl(response.data.newPhotos);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const onDrop = async (droppedFiles) => {
    setIsUploading(true);
    const [file] = droppedFiles;
    const uploadData = new FormData();
    droppedFiles.forEach((file) => {
      return uploadData.append("imagesUrl", file);
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/uploads`, uploadData)
      .then((response) => {
        setIsUploading(false);
        setImagesUrl(response.data.newPhotos);
        console.log(response.data.newPhotos);
      })
      .catch((err) => console.log(err));
  };
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 10,
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
      alert("Images are uploading");
      return;
    }

    const body = {
      placement,
      size,
      color,
      description,
      imagesUrl,
      budget,
      artistId,
      appointmentDate,
    };
    console.log(body);

    const getToken = localStorage.getItem("authToken");
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/requests/create`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        setPlacement("");
        setDescription("");
        setAppointmentDate("");
        setSize("");
        setColor(true);
        setBudget(0);
        setImagesUrl("");
        navigate(`/requests`);
      })
      .catch((err) => console.log(err));
  };

  const {
    register,
    formState: { errors },
  } = useForm();

  //const [errorMessage, setErrorMessage] = useState(undefined);

  //   const onSubmit = (data) => {
  //     const { placement, size, color, description, budget, imagesUrl } = data;
  //     const body = { placement, size, color, description, budget, imagesUrl };

  //     // axios
  //     //   .post(`${process.env.REACT_APP_API_URL}/auth/signup`, body)
  //     //   .then((response) => {
  //     //     storeToken(response.data.authToken);
  //     //     authenticateUser();
  //     //     if (profileType === "artist") {
  //     //       navigate("/signup-artist");
  //     //     } else {
  //     //       navigate("/login");
  //     //     }
  //     //   })
  //     //   .catch((err) => {
  //     //     setErrorMessage(err.response.data.errorMessage);
  //     //   });
  //   };

  return (
    <Container maxW="md">
      <div className="RequestCreate">
        <h1>Request</h1>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="placement">Placement</FormLabel>
            <Input
              placeholder="E.g. arm"
              type="text"
              {...register("placement", { required: true })}
              onChange={handlePlacement}
            />
            {errors.placement && (
              <FormErrorMessage>Required field.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="size">Size</FormLabel>
            <Input
              placeholder="E.g. 10cm"
              type="text"
              {...register("size", { required: true })}
              onChange={handleSize}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="budget">Budget</FormLabel>
            <Input
              type="number"
              {...register("budget", { required: true })}
              onChange={handleBudget}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              {...register("description", { required: true })}
              onChange={handleDescription}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="color">
              Is the tattoo coloured or black and white?
            </FormLabel>
            <RadioGroup colorScheme="red">
              <HStack spacing="24px">
                <Radio
                  value="coloured"
                  {...register("color", { required: true })}
                >
                  Coloured
                </Radio>
                <Radio
                  value="blackandwhite"
                  {...register("color", { required: true })}
                >
                  Black and White
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            {/* <FormLabel htmlFor="image">Upload a Photo:</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleFilesUpload(e)}
              multiple
            /> */}
            <Box p={5} bg="gray.100" m={4}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <ul>{acceptedFileItems}</ul>
              </div>
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="appointmentDate">appointmentDate</FormLabel>
            <Input
              type="datetime-local"
              {...register("appointmentDate", { required: true })}
              onChange={handleAppointmentDate}
            />
          </FormControl>

          <Button type="submit">Make a Request</Button>
        </form>

        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
      </div>
    </Container>
  );
}

export default RequestCreate;

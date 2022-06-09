import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RequestCreate() {
  const { artistId } = useParams();

  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [placement, setPlacement] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState(false);
  const [budget, setBudget] = useState(0);
  const [imagesUrl, setImagesUrl] = useState([]);

  const successHandle = () => {
    toast.info("Image is uploading. Click Make a Request again", {
      delay: 1000,
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  const handleTitle = (e) => setTitle(e.target.value);
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
      successHandle();
      return;
    }

    const body = {
      title,
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
        setTitle("");
        setPlacement("");
        setDescription("");
        setAppointmentDate("");
        setSize("");
        setColor(false);
        setBudget(0);
        setImagesUrl("");

        navigate(`/profile`);
      })
      .catch((err) => console.log(err));
  };

  const {
    register,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(undefined);

  return (
    <Flex
      flexGrow={1}
      justify="center"
      alignItems="center"
      className="LoginPage"
      bg="linear-gradient(180deg, rgba(252,245,233,0.0018601190476190688) 700px, rgba(23,25,35,1) 1000px), url('/images/allef-vinicius-vKIc4k6dm10-unsplash.jpg')"
      bgSize="100%"
    >
      <VStack mt={12} mb={8} spacing={5} minW="400px">
        <Heading
          color="white"
          as="h1"
          fontSize="4xl"
          fontWeight="black"
          textTransform="uppercase"
          mb={4}
        >
          Create a Tattoo Request
        </Heading>
        <Box mb={5} p={8} w="md" bg="white" rounded="lg">
          <form onSubmit={handleSubmit}>
            <FormControl pb={3}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                type="text"
                {...register("title", { required: true })}
                onChange={handleTitle}
              />
              {errors.title && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl pb={3}>
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

            <FormControl pb={3}>
              <FormLabel htmlFor="size">Size</FormLabel>
              <Input
                placeholder="E.g. 10cm"
                type="text"
                {...register("size", { required: true })}
                onChange={handleSize}
              />
              {errors.size && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl pb={3}>
              <FormLabel htmlFor="budget">Budget</FormLabel>
              <Input
                placeholder="In euro"
                type="number"
                {...register("budget", { required: true })}
                onChange={handleBudget}
              />
              {errors.budget && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl pb={3}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                {...register("description", { required: true })}
                onChange={handleDescription}
              />
              {errors.description && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl pb={3}>
              <FormLabel htmlFor="color">
                Is the tattoo coloured or black and white?
              </FormLabel>
              <RadioGroup>
                <HStack spacing="24px">
                  <Radio
                    colorScheme="red"
                    value="coloured"
                    {...register("color", { required: true })}
                  >
                    Coloured
                  </Radio>
                  <Radio
                    colorScheme="blue"
                    value="blackandwhite"
                    {...register("color", { required: true })}
                  >
                    Black and White
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl pb={3}>
              <Box textAlign="left" p={5} bg="gray.100" m={4}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Text pt={2}>
                    Drag 'n' drop some files here, or click to select files
                  </Text>
                  <UnorderedList pt="4" styleType="square">
                    {acceptedFileItems}
                  </UnorderedList>
                </div>
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="appointmentDate">Appointment Date</FormLabel>
              <Input
                type="datetime-local"
                {...register("appointmentDate", { required: true })}
                onChange={handleAppointmentDate}
              />
              {errors.appointmentDate && (
                <FormErrorMessage>Required field.</FormErrorMessage>
              )}
            </FormControl>

            <Button
              bg="gray.900"
              colorScheme="gray"
              color="white"
              px={16}
              mt={6}
              type="submit"
            >
              Make a Request
            </Button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Box>
      </VStack>
      <ToastContainer />
    </Flex>
  );
}

export default RequestCreate;

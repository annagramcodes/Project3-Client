import { Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import useAxios from "../utils/axios.hook";

function EditArtist() {
  const [artist, setArtist] = useState();

  const { apiClient } = useAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    apiClient.get(`/api/artist/byUser/${user._id}`).then((response) => {
      setArtist(response.data);
    });
  }, []);

  if (!artist) {
    return <Spinner />;
  }

  return (
    <Flex flexGrow={1} justify="center" align="center">
      <Text
        color="gray.900"
        fontSize="7xl"
        textTransform="uppercase"
        fontWeight="black"
      >
        coming soon
      </Text>
    </Flex>
  );
}

export default EditArtist;

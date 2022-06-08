import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

function RequestContainer(props) {
  const { requests } = props;

  return (
    <Box mt={6} boxShadow="base" textAlign="left" p="6" rounded="md">
      <Heading
        color="gray.700"
        pb={0.5}
        as="h4"
        fontSize={{ sm: "16px", md: "18px" }}
      >
        Your requests
      </Heading>
      {requests.map((request) => {
        return (
          <Box>
            <Text>{request.placement}</Text>
            <Text>{request.description}</Text>
          </Box>
        );
      })}
    </Box>
  );
}

export default RequestContainer;

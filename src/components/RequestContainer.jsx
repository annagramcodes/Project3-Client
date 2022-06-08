import React from "react";
import { Box, Link, Heading, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

function RequestContainer(props) {
  const { requests } = props;
  console.log(requests);

  return (
    requests && (
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
              <ReachLink to={`/requests/${request._id}`}>
                <Text>{request?.requestedBy.username}</Text>
                <Text>{request.placement}</Text>
                <Text>{request.description}</Text>
              </ReachLink>
            </Box>
          );
        })}
      </Box>
    )
  );
}

export default RequestContainer;

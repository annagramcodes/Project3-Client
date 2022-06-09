import React from "react";
import { Box, Link, Heading, Text, Divider } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

function RequestContainer(props) {
  const { requests } = props;
  console.log(requests);

  return (
    !!requests.length && (
      <Box textAlign="left" p="10" rounded="md">
        <Heading
          color="gray.700"
          pb={0.5}
          as="h4"
          fontSize={{ sm: "md", md: "2xl" }}
        >
          Recent requests:
        </Heading>
        {requests.map((request) => {
          return (
            <Box>
              <ReachLink to={`/requests/${request._id}`}>
                <Heading mt={3} as="h6" fontSize="xl" fontWeight="bold">
                  {/* {request?.requestedBy.username} */}
                  {request?.title}
                </Heading>

                <Text mt={3} as="h6">
                  When:{" "}
                  {new Date(request?.appointmentDate).toLocaleString("en-US")}
                </Text>
                <Text mb={3}>Status: {request?.status}</Text>
                <Divider />
              </ReachLink>
            </Box>
          );
        })}
      </Box>
    )
  );
}

export default RequestContainer;

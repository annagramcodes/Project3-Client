import React from "react";
import { Box, Text } from "@chakra-ui/react";

function RequestContainer(props) {
  const { requests } = props;
  console.log(requests);

  return (
    <Box>
      {requests.map((request) => {
        return (
          <>
            <Text>{request.placement}</Text>
            <Text>{request.description}</Text>
          </>
        );
      })}
    </Box>
  );
}

export default RequestContainer;

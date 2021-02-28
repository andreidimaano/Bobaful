import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  width: string;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, width }) => {
  return (
    <Box mt={8} mx="auto" maxW={width} w="100%" shadow="md" borderWidth="1px">
      {children}
    </Box>
  );
};

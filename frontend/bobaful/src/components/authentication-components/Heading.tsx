import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface HeadingProps {
  text: string;
}

export const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <Box fontSize="lg">
      <Text>{text}</Text>
    </Box>
  );
};

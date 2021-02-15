import React from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { Box, Button, Center, Link } from "@chakra-ui/react";
import { InputField } from "../components/authentication-components/InputField";
import { Navbar } from "../components/Navbar";
import NextLink from "next/link";
import { Heading } from "../components/authentication-components/Heading";

interface signinProps {}

const signin: React.FC<signinProps> = ({}) => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Box mt={8} mx="auto" maxW="700px" w="100%">
        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={(values) => {
            // check for errors
            // otherwise user is authenticated, go to home page
            console.log(values);
            router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <>
              <Center mb={4}>
                <Heading text="Sign In" />
              </Center>
              <Form>
                <InputField name="name" placeholder="name" label="Name" />
                <Box mt={5}>
                  <InputField name="email" placeholder="email" label="Email" />
                </Box>
                <Box mt={5}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Center>
                  <Button mt={5} isLoading={isSubmitting} type="submit">
                    login
                  </Button>
                </Center>
                <Center mt={3}>
                  <NextLink href="/signup">
                    <Link>Haven't already created an account? Sign Up</Link>
                  </NextLink>
                </Center>
              </Form>
            </>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default signin;

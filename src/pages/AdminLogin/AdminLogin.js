import React from "react";
import { useFormik } from "formik";
import { login, logout } from "../../api/auth";
import { AuthContext } from "../../configs/contexts/auth";
import { apassSchema } from "../../models/yup-validation-schemas/yup-song-schema";
import { Form } from "../../ui/styled-components/forms/Form";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";

export const AdminLogin = () => {
  const {
    isAuth,
    setIsAuth,
    setLoading: setAppLoading,
  } = React.useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: apassSchema,
    onSubmit: (values) => {
      setAppLoading(true);
      login(values)
        .then(() => {
          setIsAuth(true);
        })
        .catch((e) => {
          setIsAuth(false);
          console.error(e);
        })
        .finally(() => {
          setAppLoading(false);
        });
    },
  });

  const signOut = () => {
    setAppLoading(true);
    logout()
      .catch((e) => console.error(e))
      .finally(() => {
        setIsAuth(false);
        setAppLoading(false);
      });
  };

  if (isAuth) {
    return (
      <Form>
        <VStack
          spacing={4}
          align="flex-start"
          h={["calc(100vh - 60px - 155px)", "calc(100vh - 60px - 110px)"]}
        >
          <Button type="button" onClick={signOut} width="full">
            Log Out
          </Button>
        </VStack>
      </Form>
    );
  }

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <VStack
          spacing={4}
          align="center"
          h={["calc(100vh - 60px - 155px)", "calc(100vh - 60px - 110px)"]}
          justify="center"
        >
          <Flex align={"center"} direction="column" maxW={320}>
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
              mb={5}
            >
              <Input
                pr="4.5rem"
                type="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button type="submit" width="50%">
              submit
            </Button>
          </Flex>
        </VStack>
      </Form>
    </>
  );
};

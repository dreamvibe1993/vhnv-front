import React from "react";
import {  Flex, Spinner } from "@chakra-ui/react";
import { getStatus } from "../../../../api/auth";
import { AuthContext } from "../../../../configs/contexts/auth";

export const AuthWrapper = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getStatus()
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <Flex justify={'center'} h="100vh" align="center">
        <Spinner />
      </Flex>
    );

  return <AuthContext.Provider value={{ isAuth, setIsAuth, setLoading }}>{children}</AuthContext.Provider>;
};


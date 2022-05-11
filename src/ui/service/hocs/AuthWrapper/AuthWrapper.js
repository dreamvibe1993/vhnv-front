import React from "react";
import styled from "styled-components";
import { getStatus } from "../../../../api/auth";
import { AuthContext } from "../../../../configs/contexts/auth";
import { Preloader } from "../../../details/Preloader/Preloader";

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
      <PreloaderWrapper>
        <Preloader />
      </PreloaderWrapper>
    );

  return <AuthContext.Provider value={{ isAuth, setIsAuth, setLoading }}>{children}</AuthContext.Provider>;
};

const PreloaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 50%;
`;

import { useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import { login, logout } from "../../api/auth";
import { AuthContext } from "../../configs/contexts/auth";
import { apassSchema } from "../../models/yup-validation-schemas/yup-song-schema";
import { AppButton } from "../../ui/styled-components/buttons/AppButton";
import { Form } from "../../ui/styled-components/forms/Form";
import { FormErrorText } from "../../ui/styled-components/forms/FormErrorText";
import { AppInput } from "../../ui/styled-components/inputs/AppInput";

export const AdminLogin = () => {
  const { isAuth, setIsAuth, setLoading: setAppLoading } = React.useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: apassSchema,
    onSubmit: (values) => {
      setAppLoading(true);
      login(values)
        .then((res) => {
          setIsAuth(true);
          console.log(res);
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
      <AdminLoginModalContainer>
        <Form>
          <ButtonWrapper>
            <AppButton type="button" onClick={signOut}>
              Log Out
            </AppButton>
          </ButtonWrapper>
        </Form>
      </AdminLoginModalContainer>
    );
  }

  return (
    <>
      <AdminLoginModalContainer>
        <Form onSubmit={formik.handleSubmit}>
          <AppInput
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && <FormErrorText>{formik.errors.password}</FormErrorText>}
          <ButtonWrapper>
            <AppButton type="submit">submit</AppButton>
          </ButtonWrapper>
        </Form>
      </AdminLoginModalContainer>
    </>
  );
};

const AdminLoginModalContainer = styled.div`
  min-height: calc(100vh - 6.4rem - 5.5rem);
  background-color: ${(p) => p.theme.darker};
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

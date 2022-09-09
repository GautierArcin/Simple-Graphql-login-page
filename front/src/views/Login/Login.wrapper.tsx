import React from "react";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../userContext";

import Login from "./Login";
import { LOGIN } from "./Login.query";

type LoginMutationVariables = {
  email: string;
  password: string;
};

type LoginMutationResult = {
  login: {
    user: string;
    token: string;
  };
};

const LoginWrapper = (): JSX.Element => {
  const { signIn } = useUserContext();
  const navigate = useNavigate();
  const [login, { error, loading }] = useMutation<
    LoginMutationResult,
    LoginMutationVariables
  >(LOGIN, {
    onCompleted: (data) => {
      const {
        login: { token, user },
      } = data;
      signIn(user, token);
      navigate("/", { replace: true });
    },
    onError: () => {},
  });
  const handleLogin = (email: string, password: string) => {
    login({ variables: { email, password } });
  };
  const onClickSecondButton = () => {
    navigate("/signup", { replace: true });
  };
  return (
    <Login
      onLogin={handleLogin}
      loading={loading}
      error={error}
      onClickSecondButton={onClickSecondButton}
      textSecondButton={"Don't have an account ?"}
    />
  );
};

export default LoginWrapper;

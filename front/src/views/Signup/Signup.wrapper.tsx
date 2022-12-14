import React from "react";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../userContext";

import Signup from "./Signup";
import { SIGNUP } from "./Signup.query";

type SignupMutationVariables = {
  email: string;
  password: string;
};

type SignupMutationResult = {
  signup: {
    token: string;
    user: {
      email: string;
    };
  };
};

const SignupWrapper = (): JSX.Element => {
  const { signIn } = useUserContext();
  const navigate = useNavigate();
  const [signup, { error, loading }] = useMutation<
    SignupMutationResult,
    SignupMutationVariables
  >(SIGNUP, {
    onCompleted: (data) => {
      const token = data.signup.token;
      const user = data.signup.user.email;
      signIn(user, token);
      navigate("/", { replace: true });
    },
    onError: () => {},
  });
  const handleSignup = (email: string, password: string) => {
    signup({ variables: { email, password } });
  };
  const handleClickSecondButton = () => {
    navigate("/login", { replace: true });
  };
  return (
    <Signup
      onSignup={handleSignup}
      loading={loading}
      error={error}
      onClickSecondButton={handleClickSecondButton}
    />
  );
};

export default SignupWrapper;

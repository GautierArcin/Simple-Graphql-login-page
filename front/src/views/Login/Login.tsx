import React from "react";

import { ApolloError } from "@apollo/client";

import Form from "../../components/Form";

type Props = {
  error?: ApolloError;
  loading: boolean;
  onLogin: (email: string, password: string) => void;
  textSecondButton: string;
  onClickSecondButton: () => void;
};

const Login = ({
  error,
  loading,
  onLogin,
  textSecondButton,
  onClickSecondButton,
}: Props): JSX.Element => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <Form
          onSubmit={({ email, password }) => onLogin(email, password)}
          textSecondButton={textSecondButton}
          onClickSecondButton={onClickSecondButton}
        />
        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
};

export default Login;

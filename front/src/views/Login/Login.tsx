import React from "react";

import { ApolloError } from "@apollo/client";
import { Paper, Typography } from "@material-ui/core";

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
    <div
      style={{
        padding: 30,
        // overflow: "hidden",
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        style={{
          padding: 30,
          minWidth: "50%",
          justifyContent: "center",
        }}
      >
        <Typography
          style={{ paddingTop: "10px", paddingBottom: "30px" }}
          variant="h2"
          component="h2"
        >
          Login
        </Typography>
        <div>
          <Form
            onSubmit={({ email, password }) => onLogin(email, password)}
            textSecondButton={textSecondButton}
            onClickSecondButton={onClickSecondButton}
          />
          {error && <p>{error.message}</p>}
        </div>
      </Paper>
    </div>
  );
};

export default Login;

import React from "react";

import { ApolloError } from "@apollo/client";
import { Paper, Typography } from "@material-ui/core";

import Form from "../../components/Form";

type Props = {
  error?: ApolloError;
  loading: boolean;
  onSignup: (email: string, password: string) => void;
  onClickSecondButton: () => void;
};

const Signup = ({
  error,
  loading,
  onSignup,
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
          Create my account
        </Typography>
        <div>
          <Form
            onSubmit={({ email, password }) => onSignup(email, password)}
            textSecondButton={"Already have an account ?"}
            onClickSecondButton={onClickSecondButton}
          />
          {error && <p>{error.message}</p>}
        </div>
      </Paper>
    </div>
  );
};

export default Signup;

import React from "react";

import { ApolloError } from "@apollo/client";

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
    <div>
      <h1>Signup</h1>
      <div>
        <Form
          onSubmit={({ email, password }) => onSignup(email, password)}
          textSecondButton={"Login"}
          onClickSecondButton={onClickSecondButton}
        />
        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
};

export default Signup;

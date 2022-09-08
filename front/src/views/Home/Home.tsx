import React from "react";

import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../userContext";

const Home = (): JSX.Element => {
  const { signOut } = useUserContext();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <br />
      <button
        onClick={() => {
          console.log("hello");
          signOut();
          navigate("/login", { replace: true });
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Home;

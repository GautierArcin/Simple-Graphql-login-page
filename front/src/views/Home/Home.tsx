import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../userContext";

const Home = (): JSX.Element => {
  const { user, signOut } = useUserContext();
  const navigate = useNavigate();
  const onClick = () => {
    signOut();
    navigate("/", { replace: true });
  };
  return (
    <div>
      <h1>Home</h1>
      <br />
      <h2>Bienvenue {user} ! </h2>
      <Button color="secondary" variant="contained" onClick={onClick}>
        Log Out
      </Button>
    </div>
  );
};

export default Home;

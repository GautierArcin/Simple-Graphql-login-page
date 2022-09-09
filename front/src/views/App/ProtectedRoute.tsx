import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { Navigate, useLocation } from "react-router-dom";

import { isAuthenticated } from "../../auth";
import { WHOAMI } from "../../auth.query";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const location = useLocation();

  // If token expired, it's not worth it to check for graphql server
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Disabling eslint next line: no need to use the hook each time
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { loading, data } = useQuery(WHOAMI);
  if (loading) {
    return <CircularProgress />;
  }

  if (data) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;

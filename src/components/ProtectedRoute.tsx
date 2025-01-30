import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { isUserLogged } from "../utils/isUserLogged";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);
  console.log("Protected children :>> ", children);

  // const isAuthenticated = user ? true : false;

  // const redirectTo = useNavigate();

  //? using a utility function
  const isAuthenticated = isUserLogged(user);

  return <>{isAuthenticated ? children : <h4>Please login</h4>}</>;
  // return <>{isAuthenticated ? children : redirectTo("/")}</>;
}

export default ProtectedRoute;

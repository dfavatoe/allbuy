import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { isUserLogged } from "../utils/isUserLogged";
import { Button } from "react-bootstrap";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);
  console.log("Protected children :>> ", children);

  // const isAuthenticated = user ? true : false;

  const navigateTo = useNavigate();

  //? using a utility function
  const isAuthenticated = isUserLogged(user);

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <div className="d-block mt-4">
          <h4>You are signed out. Click on the link to sign in.</h4>
          <Link to={"/login"}>Login</Link>
          <h4>You still didn't create an account?</h4>
          <Link to={"/signup"}>Sign Up</Link>
          <p></p>
          <Button
            style={{ maxWidth: "200px" }}
            className="mt-4 mb-2"
            variant="warning"
            onClick={() => {
              navigateTo("/");
            }}
          >
            Return to Home
          </Button>
        </div>
      )}
    </>
  );
  // return <>{isAuthenticated ? children : redirectTo("/")}</>;
}

export default ProtectedRoute;

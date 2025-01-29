import { NavLink } from "react-router";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  //9. use the Context to get the content needed
  const { user, login, logout } = useContext(AuthContext);

  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink> |{" "}
      <NavLink to={"/products"}>Products</NavLink> |{" "}
      <NavLink to={"/searchproduct"}>Search</NavLink> |{" "}
      <NavLink to={"/register"}>Log In & Sign Up</NavLink>
      {user ? (
        <Button onClick={logout} variant="secondary">
          Logout
        </Button>
      ) : (
        <Button onClick={login} variant="warning">
          Login
        </Button>
      )}
    </nav>
  );
}

export default NavBar;

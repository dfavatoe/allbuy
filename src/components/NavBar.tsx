import { NavLink } from "react-router";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  //9. use the Context to get the content needed
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink> |{" "}
      <NavLink to={"/products"}>Products</NavLink> |{" "}
      <NavLink to={"/searchproduct"}>Search</NavLink> |{" "}
      <NavLink to={"/register"}>Register</NavLink> |{" "}
      <NavLink to={"/register/login"}>Login</NavLink> |{" "}
      <NavLink to={"/reviews"}>Reviews</NavLink>{" "}
      {user ? (
        <Button onClick={logout} variant="warning">
          Log Out
        </Button>
      ) : (
        <Button variant="secondary">Logged Out</Button>
      )}
    </nav>
  );
}

export default NavBar;

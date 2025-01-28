import React from "react";
import { Link, NavLink } from "react-router";

function NavBar() {
  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink> |{" "}
      <NavLink to={"/products"}>Products</NavLink> |{" "}
      <NavLink to={"/searchproduct"}>Search</NavLink> |{" "}
      <NavLink to={"/register"}>Log In & Sign Up</NavLink>
    </nav>
  );
}

export default NavBar;

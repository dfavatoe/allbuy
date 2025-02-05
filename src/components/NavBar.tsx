import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  //9. use the Context to get the content needed
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/">allBuy</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "200px" }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="products">Products</Nav.Link>
                <Nav.Link href="reviews">Reviews</Nav.Link>
                <NavDropdown title="Register">
                  <NavDropdown.Item href="login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="signup">Sign up</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div className="justify-content-end">
                {user ? (
                  <Button onClick={logout} variant="none">
                    Log Out
                  </Button>
                ) : (
                  <Nav.Link href="login">Hello, login!</Nav.Link>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
    </>
  );
}

export default NavBar;

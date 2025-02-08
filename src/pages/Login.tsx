import { Link, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container } from "react-bootstrap";

function Login() {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("email, password :>> ", email, password);
    login(email, password);
  };

  return (
    <>
      <Container>
        <h1>Login</h1>
        {user ? (
          <div>
            <h3>You are logged in. 🔌</h3>
            <p>Welcome back!</p>
          </div>
        ) : (
          <p>Log in to access your account and continue shopping.</p>
        )}

        <Form onSubmit={handleSubmitRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </Form.Group>
          {user ? (
            <>
              <p>
                Click on the Products button to continue your shopping
                experience.
              </p>
              <Button
                onClick={() => {
                  navigateTo("/products");
                }}
                type="button"
                className="mb-4"
                variant="warning"
              >
                Products
              </Button>
            </>
          ) : (
            <>
              <Button className="mb-4" variant="warning" type="submit">
                Login
              </Button>
              <div>Still not registered?</div>
              <Link to={"/signup"}>Sign Up</Link>
            </>
          )}
        </Form>
      </Container>
    </>
  );
}

export default Login;

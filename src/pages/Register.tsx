import { Link } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("email, password :>> ", email, password);
    register(email, password);
  };

  return (
    <>
      <h1>Register</h1>

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
        <Button type="submit" className="mb-4" variant="warning">
          Register
        </Button>
      </Form>
      <div>Do you already have an account? Click here to login.</div>
      <Link to={"/register/login"}>Login</Link>
    </>
  );
}

export default Register;

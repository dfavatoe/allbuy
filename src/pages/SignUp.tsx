import { Link, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function SignUp() {
  const { user, register } = useContext(AuthContext);
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
    register(email, password);
  };

  return (
    <>
      <h1>Sign Up</h1>
      {user ? (
        <div>
          <h3>
            Congratulations, you have succesfully created an account!!! 🙌
          </h3>
        </div>
      ) : (
        <p>
          Join us today for exclusive deals, fast checkout, and a seamless
          shopping experience!
        </p>
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
              Click on the Products button to start your shopping experience.
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
            <Button type="submit" className="mb-4" variant="warning">
              Register
            </Button>
            <div>Do you already have an account? Click here to login.</div>
            <Link to={"/login"}>Login</Link>
          </>
        )}
      </Form>
    </>
  );
}

export default SignUp;

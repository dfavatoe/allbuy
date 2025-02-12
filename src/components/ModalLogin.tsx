import { Link, useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Modal } from "react-bootstrap";
import ModalSignUp from "./ModalSignUp";

type ModalLoginProps = {
  showLogin: boolean;
  handleLoginClose: () => void;
};

function ModalLogin({ showLogin, handleLoginClose }: ModalLoginProps) {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Modal Hooks and functions
  const [showSignUp, setSignUpShow] = useState(false);
  const handleSignUpShow = () => setSignUpShow(true);
  const handleSignUpClose = () => setSignUpShow(false);

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
    <Modal show={showLogin} onHide={handleLoginClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <div>
            <h3>You are logged in. 🔌</h3>
            <p>Welcome back!</p>
          </div>
        ) : (
          <p>Sign in to access your account and continue shopping.</p>
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
              <p>Close this window to continue your shopping experience.</p>
            </>
          ) : (
            <>
              <Button className="mb-4" variant="warning" type="submit">
                Login
              </Button>

              <div className="mb-2">Still not registered?</div>

              <Button className="m-0" variant="link" onClick={handleSignUpShow}>
                Sign Up
              </Button>
              <ModalSignUp
                handleSignUpClose={handleSignUpClose}
                showSignUp={showSignUp}
              />
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLoginClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLogin;

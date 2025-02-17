import Form from "react-bootstrap/Form";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Modal } from "react-bootstrap";
import { ModalLoginProps } from "../types/customTypes";
import ModalAlert from "./ModalAlert";
import { Link } from "react-router";

function ModalLogin({ showLogin, handleLoginClose }: ModalLoginProps) {
  const { user, profileUser, login, showAlert, setShowAlert, alertText } =
    useContext(AuthContext);
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
    login(email, password);
  };
  console.log("user :>> ", user);
  return (
    <>
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user ? (
            <div>
              <h3>You are logged in. 🔌</h3>
              <p>Hi {profileUser?.displayName}! Welcome!</p>
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
                id="login-email"
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
                id="login-password"
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

                <Link to={"/signup"}>Sign Up</Link>
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
      <ModalAlert
        showAlert={showAlert}
        alertText={alertText}
        setShowAlert={setShowAlert}
      />
    </>
  );
}

export default ModalLogin;

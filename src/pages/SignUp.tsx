import { Link, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ModalAlert from "../components/ModalAlert";

function SignUp() {
  const { user, register, showAlert, setShowAlert, alertText } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("email, password :>> ", email, password)
    register(email, password);
  };

  //Creates a user's document in Firestore
  const createUserDocument = async () => {
    if (user) {
      const docRef = doc(db, "users", user.id);
      await setDoc(docRef, {
        email: user.email,
        phoneNumber: "",
        photo: null,
        userName: null,
        verifiedEmail: false,
        userId: user.id,
      });
    }
  };

  createUserDocument();

  return (
    <>
      <Container className="justify-content-center">
        <h1>Sign Up</h1>
        {user ? (
          <div>
            <h3>
              Congratulations, you have successfully created an account!!! 🙌
            </h3>
          </div>
        ) : (
          <p>
            Join us today for exclusive deals, fast checkout, and a seamless
            shopping experience!
          </p>
        )}

        <Form onSubmit={handleSubmitRegister}>
          <Form.Group className="mb-3 justify-content-center">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="signup-email"
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
              id="signup-password"
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
        <ModalAlert
          showAlert={showAlert}
          alertText={alertText}
          setShowAlert={setShowAlert}
        />
      </Container>
    </>
  );
}

export default SignUp;

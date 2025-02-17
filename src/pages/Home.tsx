import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../style/Home.css";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router";

function Home() {
  const { user, userData } = useContext(AuthContext);

  const navigateTo = useNavigate();

  return (
    <>
      <Container id="video-container">
        <video
          className="mb-2"
          id="video"
          width="100%"
          height="auto"
          autoPlay
          loop
          muted
        >
          <source
            src="../src/assets/electronics_video.mp4"
            type="video/mp4"
          ></source>
        </video>
        <Container id="text-container" fluid>
          <h1 aria-label="allBuy has">
            allBuy has <br />
            &nbsp;<span className="typewriter thick"></span>
          </h1>
        </Container>
      </Container>
      <Container className="d-block">
        <h2>Welcome to allBuy</h2>
        {user && userData ? (
          <h6>Hello {userData.userName}!</h6>
        ) : (
          <h6>Sign in for the full experience.</h6>
        )}
        <Link to={"/login"}>Login</Link>
        <br />
        <Button
          className="mt-2 mb-2"
          variant="warning"
          onClick={() => {
            navigateTo("products");
          }}
        >
          Search Products
        </Button>
      </Container>
    </>
  );
}

export default Home;

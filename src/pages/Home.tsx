import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { AuthContext } from "../context/AuthContext";
import "../style/Home.css";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

function Home() {
  //use context to get the content
  const { productsList } = useContext(ProductsContext);
  // console.log("productsList :>> ", productsList);
  const { user, profileUser } = useContext(AuthContext);

  const navigateTo = useNavigate();
  return (
    <>
      <Container id="video-container">
        <video id="video" width="100%" height="auto" autoPlay muted>
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

      {user && profileUser ? (
        <h6>Hello {profileUser.displayName}!</h6>
      ) : (
        <h6>Login for the full experience.</h6>
      )}
      {productsList ? (
        <h3>eCom offers a variety of {productsList?.length} Products</h3>
      ) : (
        <h2>Welcome to allBuy</h2>
      )}

      <Button
        className="my-4"
        variant="warning"
        onClick={() => {
          navigateTo("products");
        }}
      >
        Search Products
      </Button>
    </>
  );
}

export default Home;

import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { AuthContext } from "../context/AuthContext";
import "../style/Home.css";
import { Container } from "react-bootstrap";

function Home() {
  //use context to get the content
  const { productsList } = useContext(ProductsContext);
  // console.log("productsList :>> ", productsList);
  const { user } = useContext(AuthContext);
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
          {/* <h1 aria-label="allBuy has">
            allBuy has <br />
            &nbsp;<span className="typewriter thick"></span>
          </h1> */}
        </Container>
      </Container>

      {user ? (
        <h6>Hello {user.userName}!</h6>
      ) : (
        <h6>Login for the full experience.</h6>
      )}
      {productsList ? (
        <h3>eCom offers a variety of {productsList?.length} Products</h3>
      ) : (
        <h2>Welcome to eCom</h2>
      )}
    </>
  );
}

export default Home;

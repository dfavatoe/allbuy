import { useEffect } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router";

function AboutBlank() {
  const navigateTo = useNavigate();

  // const autoRedirect = () => {
  //   setTimeout(() => {
  //     navigateTo("/");
  //   }, 5000);
  // };

  // useEffect(() => {
  //   alert("You will be redirected in 5 seconds");
  //   autoRedirect();
  // }, []);

  return (
    <>
      <h2>Got lost?</h2>
      <p>The requested page doesn't exist.</p>
      <Container className="w-75 d-flex justify-content-center">
        <Image src="../src/assets/404_picture.jpg" fluid />
      </Container>
      {/* <img
        src="../src/assets/404_picture.jpg"
        alt="Girl lost in the desert"
        width="500"
      ></img> */}
      <Button
        className="my-4"
        variant="warning"
        onClick={() => {
          navigateTo("/");
        }}
      >
        Return to Home
      </Button>
    </>
  );
}

export default AboutBlank;

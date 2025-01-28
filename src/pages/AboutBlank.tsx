import { useEffect } from "react";
import { useNavigate } from "react-router";

function AboutBlank() {
  const navigateTo = useNavigate();

  const autoRedirect = () => {
    setTimeout(() => {
      navigateTo("/");
    }, 3000);
  };

  useEffect(() => {
    alert("You will be redirected in 3 seconds");
    autoRedirect();
  }, []);

  return (
    <>
      <h2>AboutBlank:</h2>
      <p>The requested page doesn't exist.</p>
      {/* <Button
        onClick={() => {
          navigateTo("/");
        }}
      >
        Return to Home
      </Button> */}
    </>
  );
}

export default AboutBlank;

import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { AuthContext } from "../context/AuthContext";
import "../style/Home.css";

function Home() {
  //use context to get the content
  const { productsList } = useContext(ProductsContext);
  // console.log("productsList :>> ", productsList);
  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>Home Page</h1>
      {user ? (
        <h6>Hello {user.userName}!</h6>
      ) : (
        <h6>Login to use all our features.</h6>
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

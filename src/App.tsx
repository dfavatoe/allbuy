import { useState, useEffect } from "react";
import "./App.css";
import { ProductT } from "./types/type";
import ProductCard from "./components/ProductCard";
import Grid from "./components/Grid";
import "./components/ProductCard.css";

function App() {
  const [productsList, setProductsList] = useState<ProductT[] | null>(null);

  const url = "https://dummyjson.com/products/";

  //! Async / Await

  const getProducts = async () => {
    const response = await fetch(url);
    console.log("response :>> ", response);
    const result = await response.json();
    console.log("result :>> ", result); //attention: result is an object

    const productsArray = result.products as ProductT[]; // result.products is the array
    console.log("productsArray :>> ", productsArray);

    setProductsList(productsArray);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>eCom React</h1>
      {productsList && <Grid products={productsList}></Grid>}
    </>
  );
}

export default App;

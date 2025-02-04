import { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Search from "../components/Search";
import { ProductsContext } from "../context/ProductsContext";

function ProductsTest() {
  //9. use the Context to get the content needed
  const {
    productsList,
    getProducts,
    inputText,
    uniqueCategoriesList,
    getCategoriesList,
    handleInputChange,
  } = useContext(ProductsContext);

  const filteredProducts = productsList?.filter((product) => {
    return product.title.toLowerCase().includes(inputText.toLowerCase());
  });
  console.log("filteredProducts :>> ", filteredProducts);

  useEffect(() => {
    getProducts();
    getCategoriesList();
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <h1>eCom Products Test</h1>
      {
        <Search
          uniqueCategoriesList={uniqueCategoriesList}
          inputText={inputText}
          handleInputChange={handleInputChange}
        ></Search>
      }
      {filteredProducts && <Grid products={filteredProducts}></Grid>}
    </>
  );
}

export default ProductsTest;

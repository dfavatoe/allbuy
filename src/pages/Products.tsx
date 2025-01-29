import { ChangeEvent, useEffect, useState } from "react";
import { ProductT } from "../types/type";
import Grid from "../components/Grid";
import Search from "../components/Search";

function Products() {
  const [inputText, setInputText] = useState("");

  const [uniqueCategoriesList, setUniqueCategoriesList] = useState<
    string[] | null
  >(null);

  const url = "https://dummyjson.com/products/";
  const categorySlug = "category-list";

  // Search Functions
  const getCategoriesList = async () => {
    const response = await fetch(url + categorySlug);
    console.log("response :>> ", response);
    const result = await response.json();
    console.log("result :>> ", result);
    const categoryArray = result as string[];

    setUniqueCategoriesList(categoryArray);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e.target.value);
    console.log("working");
    setInputText(e.target.value);
  };

  const filteredProducts = productsList?.filter((product) => {
    return product.title.toLowerCase().includes(inputText.toLowerCase());
  });
  console.log("filteredProducts :>> ", filteredProducts);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <>
      <h1>eCom React</h1>
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

export default Products;

import { ChangeEvent, useEffect, useState } from "react";
import { ProductT } from "../types/type";
import Grid from "../components/Grid";
import Search from "../components/Search";
import NavBar from "../components/NavBar";

function Products() {
  // State Hooks
  const [productsList, setProductsList] = useState<ProductT[] | null>(null);

  const [uniqueCategoriesList, setUniqueCategoriesList] = useState<
    string[] | null
  >(null);
  console.log("uniqueCategoriesList :>> ", uniqueCategoriesList);

  const [inputText, setInputText] = useState("");

  // Fetch
  const url = "https://dummyjson.com/products/";

  const getProducts = async () => {
    try {
      const response = await fetch(url);
      console.log("response :>> ", response);
      const result = await response.json();
      console.log("result :>> ", result); //attention: result is an object

      const productsArray = result.products as ProductT[]; // result.products is the array
      console.log("productsArray :>> ", productsArray);

      setProductsList(productsArray);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      }
    }
  };

  // Functions

  const getCategories = () => {
    const categories = productsList?.map((product) => product.category);
    console.log('categories :>> ', categories);
    const uniqueCategories = [...new Set(categories)];
    console.log("uniqueCategories :>> ", uniqueCategories);
    setUniqueCategoriesList(uniqueCategories);
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
    getCategories();
  }, [])

  return (
    <>
      <h1>eCom React</h1>
      {<Search uniqueCategoriesList={uniqueCategoriesList} inputText={inputText} handleInputChange={handleInputChange}></Search>}
      {filteredProducts && <Grid products={filteredProducts}></Grid>}
    </>
  );
}

export default Products;
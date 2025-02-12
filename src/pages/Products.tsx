import { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Search from "../components/Search";
import { ProductsContext } from "../context/ProductsContext";
import { ProductT } from "../types/customTypes";
import { Container, Spinner } from "react-bootstrap";

function Products() {
  //9. use the Context to get the content needed
  const [productsList, setProductsList] = useState<ProductT[] | null>(null);

  const [loading, setLoading] = useState(true);

  const [inputText, setInputText] = useState("");

  const [uniqueCategoriesList, setUniqueCategoriesList] = useState<
    string[] | null
  >(null);

  const url = "https://dummyjson.com/products/";
  const categorySlug = "category-list";

  //Fetch Default Products
  const getProducts = async () => {
    try {
      const response = await fetch(url);
      // console.log("response :>> ", response);
      const result = await response.json();
      console.log("result :>> ", result); //attention: result is an object

      const productsArray = result.products as ProductT[]; // result.products is the array
      console.log("productsArray :>> ", productsArray);

      setProductsList(productsArray);
      setLoading(false);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

  // Fetch Categories names for Category's button
  const getCategoriesList = async () => {
    const response = await fetch(url + categorySlug);
    console.log("response :>> ", response);
    const result = await response.json();
    console.log("result :>> ", result);
    const categoryArray = result as string[];

    setUniqueCategoriesList(categoryArray);
  };

  //set value from search input
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
      <Container>
        <h1>eCom React</h1>
        {
          <Search
            uniqueCategoriesList={uniqueCategoriesList}
            inputText={inputText}
            handleInputChange={handleInputChange}
          ></Search>
        }
        <>
          {loading ? (
            <div>
              <Spinner animation="border" variant="warning" />
              <p>Loading...</p>
            </div>
          ) : (
            console.log("Data loaded!")
          )}
          {filteredProducts && <Grid products={filteredProducts}></Grid>}
        </>
      </Container>
    </>
  );
}

export default Products;

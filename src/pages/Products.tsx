import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Search from "../components/Search";
import { ProductT } from "../types/customTypes";
import { Container, Spinner } from "react-bootstrap";
import "../style/Products.css";
import useFetch from "../hooks/useFetch";

function Products() {
  const [productsList, setProductsList] = useState<ProductT[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [uniqueCategoriesList, setUniqueCategoriesList] = useState<
    string[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Category"
  );

  const url = "https://dummyjson.com/products/";
  const categorySlug = "category-list";

  //Fetches the first 30 products displayed in the page
  const getProducts = async () => {
    try {
      const response = await fetch(url);
      // console.log("response :>> ", response);
      const result = await response.json();
      // console.log("result :>> ", result); //attention: result is an object

      const searchArray = result.products as ProductT[]; // result.products is the array
      // console.log("productsArray :>> ", searchArray);

      setProductsList(searchArray);
      setLoading(false);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

  //Fetches products accordingly to the search inputText
  const { data: searchedProducts } = useFetch<ProductT[]>(
    `https://dummyjson.com/products/search?q=${inputText}`
  );
  // console.log("searchedProducts :>> ", searchedProducts);

  // Fetches Categories list for Category's button and menu bar
  const getCategoriesList = async () => {
    try {
      const response = await fetch(url + categorySlug);
      console.log("response :>> ", response);
      const result = await response.json();
      console.log("result :>> ", result);
      const categoryArray = result as string[];

      setUniqueCategoriesList(categoryArray);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

  // Fetches Products by Category when category is selected
  const url2 = `https://dummyjson.com/products/category/${selectedCategory}`;

  const getProductsByCategory = async () => {
    try {
      const response = await fetch(url2);
      console.log("response :>> ", response);
      const result = await response.json();
      console.log("result :>> ", result); //attention: result is an object

      const searchArray = result.products as ProductT[]; // result.products is the array
      // console.log("productsByCategoryArray :>> ", searchArray);
      setProductsList(searchArray);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

  //sets value from search input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e.target.value);
    // console.log("working");
    setInputText(e.target.value);
  };

  //sets value from selected Category in the dropdown menu
  const handleDropdownChange = (eventKey: string | null) => {
    // console.log("working");
    console.log("DropDown Selected Category :>> ", eventKey);
    setSelectedCategory(eventKey);
  };

  //sets the selected category on the horizontal scroll bar menu
  const handleSelectedCategory = (e: MouseEvent<HTMLButtonElement>) => {
    // console.log("Selected Event ", e);
    const target = e.target as HTMLButtonElement;
    console.log("Selected value :>> ", target.value);
    setSelectedCategory(target.value);
  };

  //sets the products array filtering the searched word inside the selected category (combined)
  const handleProductSearch = () => {
    if (searchedProducts) {
      const combinedSearchAndCategory = searchedProducts.filter((product) => {
        return (
          selectedCategory === product.category || selectedCategory === "All"
        );
      });
      setProductsList(
        combinedSearchAndCategory.length > 0 ? combinedSearchAndCategory : null
      );
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProductsByCategory();
  }, [url2]);

  return (
    <>
      {/* Categories Scroll Menu */}
      <div className="scrollmenu justify-content-center">
        {uniqueCategoriesList &&
          uniqueCategoriesList.map((category, i) => {
            return (
              <button
                value={category}
                data-id={category}
                onClick={handleSelectedCategory}
                key={i}
              >
                {category}
              </button>
            );
          })}
      </div>
      <Container className="justify-content-center">
        <h1>allBuy Products</h1>
        {
          <Search
            uniqueCategoriesList={uniqueCategoriesList}
            inputText={inputText}
            handleInputChange={handleInputChange}
            handleDropdownChange={handleDropdownChange}
            selectedCategory={selectedCategory}
            handleProductSearch={handleProductSearch}
          ></Search>
        }
        <>
          {loading ? (
            <div>
              <Spinner animation="border" variant="warning" />
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {productsList ? (
                <Grid products={productsList}></Grid>
              ) : (
                <h3>Sorry, no matches were found! 😕</h3>
              )}
            </>
          )}
        </>
      </Container>
    </>
  );
}

export default Products;

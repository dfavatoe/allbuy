import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import Grid from "../components/Grid";
import Search from "../components/Search";
import { ProductsContext } from "../context/ProductsContext";
import { ProductT } from "../types/customTypes";
import { Container, Spinner } from "react-bootstrap";
import "../style/Products.css";

function ProductsUrl() {
  //9. use the Context to get the content needed
  const [productsList, setProductsList] = useState<ProductT[] | null>(null);

  const [loading, setLoading] = useState(true);

  const [searchedProducts, setSearchedProducts] = useState<ProductT[] | null>(
    null
  );

  const [productsByCategoryList, setProductsByCategoryList] = useState<
    ProductT[] | null
  >(null);

  const [inputText, setInputText] = useState("");

  const [uniqueCategoriesList, setUniqueCategoriesList] = useState<
    string[] | null
  >(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Category"
  );

  const url = "https://dummyjson.com/products/";
  const categorySlug = "category-list";

  const url1 = `https://dummyjson.com/products/search?q=${inputText}`;

  const getProducts = async () => {
    try {
      const response = await fetch(url);
      console.log("response :>> ", response);
      const result = await response.json();
      console.log("result :>> ", result); //attention: result is an object

      const searchArray = result.products as ProductT[]; // result.products is the array
      console.log("productsArray :>> ", searchArray);

      setProductsList(searchArray);
      setLoading(false);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

  const getSearchedProducts = async () => {
    try {
      const response = await fetch(url1);
      console.log("response :>> ", response);
      const result = await response.json();
      console.log("result :>> ", result); //attention: result is an object

      const searchArray = result.products as ProductT[]; // result.products is the array
      console.log("productsArray :>> ", searchArray);

      setSearchedProducts(searchArray);
      setLoading(false);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

  // Fetches Categories names for Category's button
  const getCategoriesList = async () => {
    const response = await fetch(url + categorySlug);
    console.log("response :>> ", response);
    const result = await response.json();
    console.log("result :>> ", result);
    const categoryArray = result as string[];

    setUniqueCategoriesList(categoryArray);
  };

  // Fetches Products by Category
  const url2 = `https://dummyjson.com/products/category/${selectedCategory}`;

  const getProductsByCategory = async () => {
    try {
      const response = await fetch(url2);
      console.log("response :>> ", response);
      const result = await response.json();
      console.log("result :>> ", result); //attention: result is an object

      const searchArray = result.products as ProductT[]; // result.products is the array
      console.log("productsByCategoryArray :>> ", searchArray);

      setProductsList(searchArray);
      // setProductsByCategoryList(searchArray);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

  //set value from search input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e.target.value);
    // console.log("working");
    setInputText(e.target.value);
  };

  const handleDropdownChange = (eventKey: string | null) => {
    // console.log("working");
    console.log("DropDown Selected Category :>> ", eventKey);
    setSelectedCategory(eventKey);
  };

  const handleProductSearch = (e: MouseEvent<HTMLButtonElement>) => {
    if (searchedProducts) {
      const combinedSearchAndCategory = searchedProducts?.filter((product) => {
        return (
          selectedCategory === product.category || selectedCategory === "All"
        );
      });
      setProductsList(
        combinedSearchAndCategory.length > 0 ? combinedSearchAndCategory : null
      );
    }
  };

  const handleSelectedCategory = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("Selected Event ", e);
    const target = e.target as HTMLButtonElement;
    console.log("Selected value :>> ", target.value);
    setSelectedCategory(target.value);
  };

  // const filteredProductsFinal = productsList?.filter((product) => {
  //   return selectedCategory === product.category || selectedCategory === "All";

  const filteredProducts = productsList?.filter((product) => {
    return product.title.toLowerCase().includes(inputText.toLowerCase());
  });
  console.log("filteredProducts :>> ", filteredProducts);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getSearchedProducts();
  }, [url1]);

  useEffect(() => {
    getProductsByCategory();
  }, [url2]);

  return (
    <>
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
        <h1>eCom React</h1>
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
            console.log("Data loaded!")
          )}
          {productsList ? (
            <Grid products={productsList}></Grid>
          ) : (
            <h3>Sorry, no matches were found! 😕</h3>
          )}
        </>
      </Container>
    </>
  );
}

export default ProductsUrl;

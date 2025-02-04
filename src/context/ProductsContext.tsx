import { ChangeEvent, createContext, ReactNode, useState } from "react";
import { ProductT } from "../types/customTypes";

//3. Define Provider's props types
type ProductsContextProviderProps = {
  children: ReactNode; //This type defines children as a React component
};

//5. Define the Context's type
type ProductsContext = {
  productsList: ProductT[] | null;
  inputText: string;
  uniqueCategoriesList: string[] | null;
  getProducts: () => Promise<void>;
  getCategoriesList: () => Promise<void>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

//6. Define initial value of contents shared by the Context
const contextInitialValue: ProductsContext = {
  productsList: null,
  inputText: "",
  getProducts: () => {
    throw new Error("Context still not initialized");
  },
  uniqueCategoriesList: null,
  getCategoriesList: () => {
    throw new Error("Context still not initialized");
  },
  handleInputChange: () => {
    throw new Error("Context still not initialized");
  },
};

// 1. Create context
export const ProductsContext =
  createContext<ProductsContext>(contextInitialValue);

//2. Create Provider (Contains the content)
export const ProductsContextProvider = ({
  children,
}: ProductsContextProviderProps) => {
  // console.log("%c Context Running", "color: orange");
  //4. Move useStates and Functions to the Provider
  //? Products useStates
  const [productsList, setProductsList] = useState<ProductT[] | null>(null);

  //? SearchBar useStates and Funcs
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
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

  //Fetch Category's List to button
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

  //Search input set value
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e.target.value);
    console.log("working");
    setInputText(e.target.value);
  };

  //7. Include in the "value" property, the content to be provided
  return (
    <ProductsContext.Provider
      value={{
        productsList,
        inputText,
        uniqueCategoriesList,
        getProducts,
        getCategoriesList,
        handleInputChange,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

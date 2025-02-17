import {
  ChangeEvent,
  createContext,
  MouseEvent,
  ReactNode,
  useState,
} from "react";
import { ProductT } from "../types/customTypes";

//3. Define Provider's props types
type ProductsContextProviderProps = {
  children: ReactNode; //Defines children as a React components
};

//5. Define the Context's type
type ProductsContext = {
  productsList: ProductT[] | null;
  inputText: string;
  uniqueCategoriesList: string[] | null;
  loading: boolean;
  getProducts: () => Promise<void>;
  getCategoriesList: () => Promise<void>;
  getProductsByCategory: () => Promise<void>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDropdownChange: (eventKey: string | null) => void;
  handleSelectedCategory: (e: MouseEvent<HTMLButtonElement>) => void;
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
  getProductsByCategory: () => {
    throw new Error("Context still not initialized");
  },
  handleInputChange: () => {
    throw new Error("Context still not initialized");
  },
  handleDropdownChange: () => {
    throw new Error("Context still not initialized");
  },
  handleSelectedCategory: () => {
    throw new Error("Context still not initialized");
  },
  loading: true,
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

  //Fetch Default Products
  const getProducts = async () => {
    try {
      const response = await fetch(url);
      // console.log("response :>> ", response);
      const result = await response.json();
      // console.log("result :>> ", result); //attention: result is an object

      const productsArray = result.products as ProductT[]; // result.products is the array
      // console.log("productsArray :>> ", productsArray);

      setProductsList(productsArray);
      setLoading(false);
    } catch {
      (error: Error) => {
        console.log("error: ", error);
        throw error;
      };
    }
  };

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

  //Search input set value
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

  //7. Include in the "value" property, the content to be provided
  return (
    <ProductsContext.Provider
      value={{
        productsList,
        inputText,
        uniqueCategoriesList,
        loading,
        getProducts,
        getCategoriesList,
        getProductsByCategory,
        handleInputChange,
        handleDropdownChange,
        handleSelectedCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

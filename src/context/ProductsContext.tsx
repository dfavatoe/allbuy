import { createContext, ReactNode, useState } from "react";
import { ProductT } from "../types/type";

//3. Define Provider's props types
type ProductsContextProviderProps = {
  children: ReactNode; //This type defines children as a React component
};

//5. Define the Context's type
type ProductsContext = {
  productsList: ProductT[] | null;
  getProducts: () => Promise<void>;
};

//6. Define initial value of contents shared by the Context
const contextInitialValue: ProductsContext = {
  productsList: null,
  getProducts: () => {
    throw new Error("Context still not initialized");
  },
  // getProducts: () => Promise.resolve(),
};

// 1. Create context
export const ProductsContext =
  createContext<ProductsContext>(contextInitialValue);

//2. Create Provider (Contains the content)
export const ProductsContextProvider = ({
  children,
}: ProductsContextProviderProps) => {
  console.log("%c Context Running", "color: orange");
  //4. Move useStates and Functions to the Provider
  const [productsList, setProductsList] = useState<ProductT[] | null>(null);

  const url = "https://dummyjson.com/products/";
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

  //7. Include in the "value" property, the content to be provided
  return (
    <ProductsContext.Provider value={{ productsList, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

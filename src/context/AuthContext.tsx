import { createContext, ReactNode, useState } from "react";
import { User } from "../types/type";

//3. Define Provider's props types
type AuthContextProviderProps = {
  children: ReactNode;
};

//5. Define the Context's type
type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

//6. Define initial value of contents shared by the Context

const contextInitialValue: AuthContextType = {
  user: null,
  login: () => {
    throw new Error("Context not initialised");
  },
  logout: () => {
    throw new Error("Context not initialised");
  },
};

// 1. Create context
export const AuthContext = createContext<AuthContextType>(contextInitialValue);

//2. Create Provider (Contains the content)
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  console.log("children :>> ", children);
  //4. Move useStates and Functions to the Provider
  const user1: User = {
    email: "joe@test.com",
    userName: "Joe",
  };

  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser(user1);
  };

  const logout = () => {
    setUser(null);
  };

  //7. Include in the "value" property, the content to be provided
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

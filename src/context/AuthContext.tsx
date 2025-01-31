import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

//3. Define Provider's props types
type AuthContextProviderProps = {
  children: ReactNode;
};

//5. Define the Context's type
type AuthContextType = {
  user: User | null;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

//6. Define initial value of contents shared by the Context

const contextInitialValue: AuthContextType = {
  user: null,
  register: () => {
    throw new Error("Context not initialised");
  },
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
  // console.log("children :>> ", children);
  // console.log("auth :>> ", auth);

  //4. Move useStates and Functions to the Provider
  const [user, setUser] = useState<User | null>(null);

  const register = async (email: string, password: string) => {
    console.log("email, password Auth :>>", email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user registered :>> ", user);
    } catch (err) {
      const error = err as Error;
      console.log("error message :>> ", error.message);
    }
  };

  const login = async (email: string, password: string) => {
    // setUser();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user logged in :>> ", user);
        const email = user.email; // firebase type for user email and id "string | null".
        const id = user.uid;
        if (email && id) {
          setUser({ email, id });
        } else {
          throw new Error("User information not found");
        }
        //But because we want it not null we use the if condition

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage :>> ", errorMessage);
      });
  };

  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email; //Try to create a object for email and id??
        const id = user.uid;
        if (email && id) {
          setUser({ email, id });
        } else {
          throw new Error("User information not found");
        }
        console.log("%c user is logged in :>> ", "color: green", user.email);
      } else {
        setUser(null);
        console.log("%c user is signed out :>> ", "color: red");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("%c user is signed out :>> ", "color: red");
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log("Problems signing out user");
      });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

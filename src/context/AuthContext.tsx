import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import { UserT } from "../types/customTypes";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

//3. Define Provider's props types
type AuthContextProviderProps = {
  children: ReactNode;
};

//5. Define the Context's type
type AuthContextType = {
  user: UserT | null;
  profileUser: User | null;
  userData: UserData | null;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  getUserData: () => Promise<void>;
  loading: boolean;
  showAlert: boolean;
  setShowAlert: Dispatch<React.SetStateAction<boolean>>;
  alertText: string;

  // checkUserStatus: () => void;
};
type UserData = {
  city?: string | null;
  phoneNumber?: string | null;
  photo?: string | null;
  profession?: string | null;
  userName?: string | null;
  email?: string | null;
  zip?: string | null;
  userId?: string | null;
};
//6. Define initial value of contents shared by the Context

const contextInitialValue: AuthContextType = {
  user: null,
  profileUser: null,
  userData: null,
  register: () => {
    throw new Error("Context not initialised");
  },
  login: () => {
    throw new Error("Context not initialised");
  },
  logout: () => {
    throw new Error("Context not initialised");
  },
  getUserData: () => {
    throw new Error("Context not initialised");
  },
  loading: true,
  showAlert: false,
  alertText: "",
  setShowAlert: () => false,
};

// 1. Create context
export const AuthContext = createContext<AuthContextType>(contextInitialValue);

//2. Create Provider (Contains the content)
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // console.log("children :>> ", children);
  // console.log("auth :>> ", auth);

  //4. Move useStates and Functions to the Provider
  const [user, setUser] = useState<UserT | null>(null);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  //Modal Alert Hooks
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

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
      setAlertText(error.message);
      setShowAlert(true);
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
          getUserData();
        } else {
          throw new Error("User information not found");
        }
        //But because we want it not null we use the if condition
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode/errorMessage :>> ", errorCode, errorMessage);
        setAlertText(errorMessage);
        setShowAlert(true);
      });
  };

  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email; //Try to create an object for email and id??
        const id = user.uid;
        const currUser = auth.currentUser;
        setProfileUser(currUser);
        if (email && id) {
          console.log("email :>> ", email);

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

  //get user data from Firestore
  const getUserData = async () => {
    //Get data from Firestore
    if (user) {
      console.log("user :>> ", user);
      const docRef = doc(db, "users", user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setUserData(docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data(); will be undefined in this case
        console.log("No such document!");
      }
    }
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
        console.log("Problems signing out user: ", error.message);
      });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    user && getUserData(); //if you have a user, get the user's data
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profileUser,
        login,
        logout,
        register,
        userData,
        getUserData,
        loading,
        showAlert,
        setShowAlert,
        alertText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

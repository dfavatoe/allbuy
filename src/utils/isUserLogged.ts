import { User } from "../types/customTypes";

const isUserLogged = (user: User | null) => {
  const isAuthenticated = user ? true : false;
  return isAuthenticated;
};

export { isUserLogged };

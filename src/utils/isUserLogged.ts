import { User } from "../types/type";

const isUserLogged = (user: User | null) => {
  const isAuthenticated = user ? true : false;
  return isAuthenticated;
};

export { isUserLogged };

import { UserT } from "../types/customTypes";

const isUserLogged = (user: UserT | null) => {
  const isAuthenticated = user ? true : false;
  return isAuthenticated;
};

export { isUserLogged };

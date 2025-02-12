import "../src/style/App.css";
import Products from "./pages/Products";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import AboutBlank from "./pages/AboutBlank";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SingleProductPage from "./pages/SingleProductPage";
import Home from "./pages/Home";
import { ProductsContextProvider } from "./context/ProductsContext";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { db } from "./config/firebaseConfig";
import Reviews from "./pages/Reviews";
import TestCustomHook from "./pages/TestCustomHook";
import ProductsTest from "./pages/ProductsTest";
import ProductsUrl from "./pages/ProductsUrl";
import UserAccount from "./pages/UserAccount";

const Root = () => {
  return (
    <>
      <div className="content-container">
        <NavBar />
        <Outlet />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
};

//8. Use the Provider as a wrapper to the necessary routes
function App() {
  // console.log("app :>> ", app);
  // console.log("auth :>> ", auth);
  console.log("db :>> ", db);
  return (
    <>
      <AuthContextProvider>
        <ProductsContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" />
              <Route element={<Root />}>
                <Route index element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/:productId"
                  element={<SingleProductPage />}
                />
                <Route path="productstest" element={<ProductsTest />} />
                <Route path="productsurl" element={<ProductsUrl />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="reviews"
                  element={
                    <ProtectedRoute>
                      <Reviews />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route path="account" element={<UserAccount />} />
                <Route path="customhook" element={<TestCustomHook />}></Route>
                <Route path="*" element={<AboutBlank />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProductsContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;

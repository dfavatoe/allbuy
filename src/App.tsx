import "./App.css";
import Products from "./pages/Products";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import SearchProduct from "./pages/SearchProduct";
import NavBar from "./components/NavBar";
import AboutBlank from "./pages/AboutBlank";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SingleProductPage from "./pages/SingleProductPage";
import Home from "./pages/Home";
import { ProductsContextProvider } from "./context/ProductsContext";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { app, auth, db } from "./config/firebaseConfig";
import Reviews from "./pages/Reviews";
import TestCustomHook from "./pages/TestCustomHook";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
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
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/:productId"
                  element={<SingleProductPage />}
                />

                <Route path="/searchproduct" element={<SearchProduct />} />
                <Route path="/register">
                  <Route index element={<Register />} />
                  <Route path="login" element={<Login />} />
                </Route>
                <Route path="reviews" element={<Reviews />}></Route>
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

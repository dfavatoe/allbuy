import "./App.css";
import Products from "./pages/Products";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import SearchProduct from "./pages/SearchProduct";
import NavBar from "./components/NavBar";
import AboutBlank from "./pages/AboutBlank";
import Footer from "./components/Footer";
import LogInOrSignUp from "./pages/LogInOrSignUp";
import SignUp from "./pages/SignUp";
import SingleProductPage from "./pages/SingleProductPage";
import Home from "./pages/Home";
import { ProductsContextProvider } from "./context/ProductsContext";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { app } from "./config/firebaseConfig";

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
  console.log("app :>> ", app);
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
                  <Route index element={<LogInOrSignUp />} />
                  <Route path="signup" element={<SignUp />} />
                </Route>
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

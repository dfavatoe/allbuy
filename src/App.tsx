import "../src/style/App.css";
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
import UserAccount from "./pages/UserAccount";
import Products from "./pages/Products";

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

function App() {
  // console.log("app :>> ", app);
  // console.log("auth :>> ", auth);
  console.log("db :>> ", db);
  return (
    <>
      {/* The Providers are wrappers to the necessary routes */}
      <AuthContextProvider>
        <ProductsContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" />
              <Route element={<Root />}>
                <Route index element={<Home />} />
                <Route path="/products" element={<Products />} />
                {/* "dynamic segment" will be parsed from the URL and provided as params to other router APIs. */}
                <Route
                  path="/products/:productId"
                  element={<SingleProductPage />}
                />
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
                <Route
                  path="account"
                  element={
                    <ProtectedRoute>
                      <UserAccount />
                    </ProtectedRoute>
                  }
                />
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

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

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route element={<Root />}>
            {/* Below, this is your home for now */}
            <Route index element={<Products />} />
            <Route path="/products" element={<Products />} />
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
    </>
  );
}

export default App;

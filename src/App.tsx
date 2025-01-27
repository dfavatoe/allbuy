import { useState } from "react";
import "./App.css";
import Products from "./pages/Products";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import SearchProduct from "./pages/SearchProduct";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import AboutBlank from "./components/AboutBlank";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route element={<Root />}>
            <Route index element={<Products />} />
            <Route path="/searchproduct" element={<SearchProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<AboutBlank />} />
          </Route>


        </Routes>

      </BrowserRouter>
    </>
  );
}



export default App;

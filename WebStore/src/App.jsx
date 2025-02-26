import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import AddNewProductPage from "./pages/AddNewProductPage/AddNewProductPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { useEffect, useState } from "react";

function App() {
  const [savedProducts, setSavedProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }, [savedProducts]);

  return (
    <BrowserRouter>
      <div id="app">
        <Header />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route
            path="/addNewProduct"
            element={<AddNewProductPage setSavedProducts={setSavedProducts} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

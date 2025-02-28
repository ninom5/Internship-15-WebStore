import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import AddNewProductPage from "./pages/AddNewProductPage/AddNewProductPage.jsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
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
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              index
              element={
                <ProductsPage
                  savedProducts={savedProducts}
                  setSavedProducts={setSavedProducts}
                />
              }
            />
            <Route
              path="/addNewProduct"
              element={
                <AddNewProductPage setSavedProducts={setSavedProducts} />
              }
            />
            <Route
              path={"/:productId"}
              element={<ProductPage savedProducts={savedProducts} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

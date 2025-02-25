import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AddNewProductPage from "./pages/AddNewProductPage/AddNewProductPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <Header />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/addNewProduct" element={<AddNewProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

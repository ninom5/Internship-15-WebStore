import { useEffect, useState, useMemo } from "react";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import ProductCard from "../../components/ProductCard/ProductCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Menu, MenuItem, Button } from "@mui/material";
import fetchProducts from "../../utils/fetchProducts.js";

const ProductsPage = ({ setFetchedProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [element, setElement] = useState(null);
  const [open, setOpen] = useState(false);
  const [categorySelect, setCategorySelect] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchedData = async () => {
      setLoading(true);
      const allProducts = await fetchProducts();

      setProducts(allProducts);
      setFetchedProducts(allProducts);
      setLoading(false);
    };

    fetchedData();
  }, []);

  const filteredProducts = useMemo(() => {
    let updatedProducts = [...products];

    if (categorySelect === "top20") {
      return [...updatedProducts]
        .sort((a, b) => b.rating?.rate - a.rating?.rate)
        .slice(0, 20);
    }

    if (categorySelect !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === categorySelect
      );
    }

    if (searchValue) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue)
      );
    }

    return updatedProducts;
  }, [categorySelect, searchValue, products]);

  const handleMenuClick = (e) => {
    setElement(e.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const handleCategorySelect = (categoryOption) => {
    setCategorySelect(categoryOption);
    handleMenuClose();
  };

  if (loading) {
    return <LoadingSkeleton numberOfProducts={8} />;
  }

  return (
    <>
      <h1>Web store</h1>
      <div className="filters">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={products.map((product) => product.title)}
          renderInput={(params) => (
            <TextField {...params} label="Search by name" />
          )}
          onInputChange={(event, newInputValue) =>
            setSearchValue(newInputValue?.toLowerCase() || "")
          }
        />

        <Button onClick={handleMenuClick} id="filter-button">
          {categorySelect === "top20"
            ? "Top 20 Products"
            : "Filter by category"}
        </Button>

        <Menu anchorEl={element} open={open} onClose={handleMenuClose}>
          {[
            "all",
            "top20",
            "electronics",
            "men's clothing",
            "women's clothing",
          ].map((category) => (
            <MenuItem
              key={category}
              onClick={() => handleCategorySelect(category)}
            >
              {category === "top20" ? "Top 20 products" : category}
            </MenuItem>
          ))}
        </Menu>
        <h2>
          {categorySelect === "top20"
            ? "Top 20 products by rating"
            : categorySelect}
        </h2>
      </div>

      <section className="all-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products matching your filters and search</p>
        )}
      </section>
    </>
  );
};

export default ProductsPage;

import { useEffect, useState } from "react";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import ProductCard from "../../components/ProductCard/ProductCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Menu, MenuItem, Button } from "@mui/material";

const ProductsPage = ({ savedProducts, setSavedProducts }) => {
  // const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [element, setElement] = useState(null);
  const [open, setOpen] = useState(false);
  const [categorySelect, setCategorySelect] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Error fetching data");

        const data = await response.json();
        const localProducts =
          JSON.parse(localStorage.getItem("products")) || [];

        if (!Array.isArray(data) || !Array.isArray(localProducts))
          throw new Error("Data or localProducts is not an array");

        const allProducts = [...localProducts, ...data].filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        // setProducts(allProducts);
        setSavedProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Error fetching data: ", error);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchedData();
  }, []);

  useEffect(() => {
    if (categorySelect === "top20") {
      const topProducts = savedProducts
        .sort((a, b) => b.rating?.rate - a.rating?.rate)
        .slice(0, 20);

      setFilteredProducts(topProducts);

      return;
    }

    let updatedProducts =
      categorySelect === "all"
        ? savedProducts
        : savedProducts.filter(
            (product) => product.category === categorySelect
          );

    // if (searchTerm) {
    //   updatedProducts = updatedProducts.filter((product) =>
    //     product.title.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

    setFilteredProducts(updatedProducts);
  }, [categorySelect /*searchFilter*/, , savedProducts]);

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

  const handleSearch = (event, searchTerm) => {
    setSearchValue(searchTerm);
    console.log(searchValue);
  };

  if (loading) {
    return <LoadingSkeleton numberOfProducts={savedProducts.length} />;
  }

  return (
    <>
      <h1>Web store</h1>
      <div className="filters">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={savedProducts}
          getOptionLabel={(option) => option?.title ?? ""}
          getOptionKey={(option) => option.id ?? option.title}
          renderInput={(params) => (
            <TextField {...params} label="Search by name" />
          )}
          onInputChange={handleSearch}
        />
        <Button onClick={handleMenuClick}>Filter by category</Button>

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
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </section>
    </>
  );
};

export default ProductsPage;

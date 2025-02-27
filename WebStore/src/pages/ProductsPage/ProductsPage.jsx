import { useEffect, useState } from "react";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import ProductCard from "../../components/ProductCard/ProductCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Menu, MenuItem, Button } from "@mui/material";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [element, setElement] = useState(null);
  const [open, setOpen] = useState(false);

  const localProducts = JSON.parse(localStorage.getItem("products")) || [];

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Error fetching data");

        const data = await response.json();

        if (!Array.isArray(data) || !Array.isArray(localProducts))
          throw new Error("Data or localProducts is not an array");

        const allProducts = [...data, ...localProducts];

        const sortedProducts = allProducts.sort(
          (a, b) => b.rating?.rate - a.rating?.rate
        );
        const topProducts = sortedProducts.slice(0, 20);

        setProducts(topProducts);
      } catch (error) {
        console.error("Error fetching data: ", error);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchedData();
  }, []);

  const handleMenuClick = (e) => {
    setElement(e.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <LoadingSkeleton numberOfProducts={products.length} />;
  }

  return (
    <>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={products.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
      <Button onClick={handleMenuClick}>Filter by category</Button>
      <Menu anchorEl={element} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleMenuClose}>aa</MenuItem>
        <MenuItem onClick={() => handleMenuClose}>aa</MenuItem>
        <MenuItem onClick={() => handleMenuClose}>aa</MenuItem>
        <MenuItem onClick={() => handleMenuClose}>aa</MenuItem>
        <MenuItem>bb</MenuItem>
      </Menu>
      <section className="all-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
};

export default ProductsPage;

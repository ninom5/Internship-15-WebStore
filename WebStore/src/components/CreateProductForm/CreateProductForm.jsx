import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Product from "../../model/ProductEntity.js";

const CreateProductForm = ({ setSavedProducts }) => {
  const validateProductData = (localStorageProducts) => {
    if (
      !productFormData.title ||
      !productFormData.price ||
      !productFormData.description ||
      !category
    ) {
      toast.error("Please fill in all fields");
      console.log(productFormData);
      return false;
    }

    if (
      productFormData.title?.trim() === "" ||
      productFormData.price?.trim() === "" ||
      productFormData.description?.trim() === ""
    ) {
      toast.error("Fields can't be empty");
      console.log(productFormData);
      return false;
    }

    const parsedPrice = parseFloat(productFormData.price);
    if (parsedPrice <= 0 || isNaN(parsedPrice)) {
      toast.error("Price must be a number greater than 0");
      return false;
    }

    if (localStorageProducts.length >= 25) {
      toast.error("To prevent overflow you cant create more than 25 products");
      return false;
    }

    return true;
  };

  const [category, setCategory] = useState("");
  const [productFormData, setProductFormData] = useState({
    title: "",
    price: "",
    description: "",
  });

  const categories = [
    {
      value: "electronics",
      label: "Electronics",
    },
    {
      value: "jewelry",
      label: "Jewelry",
    },
    {
      value: "men's clothing",
      label: "Men's clothing",
    },
    {
      value: "women's clothing",
      label: "Women's clothing",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const localStorageProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    if (!validateProductData(localStorageProducts)) return;

    const newProduct = new Product(
      productFormData.title,
      productFormData.price,
      category,
      productFormData.description
    );

    setSavedProducts([...localStorageProducts, newProduct]);

    setProductFormData({
      title: "",
      price: "",
      description: "",
    });

    setCategory("");

    toast.success("Successfully added new product");
  };

  return (
    <div className="form-background">
      <h2>Create product form</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outline-required"
          label="Title"
          onChange={handleChange}
          name="title"
          value={productFormData.title}
          required
        />

        <TextField
          id="outline-required"
          label="Price"
          onChange={handleChange}
          name="price"
          value={productFormData.price}
          required
        />

        <TextField
          id="outlined-select-currency"
          select
          value={category}
          label="Category"
          onChange={handleCategoryChange}
          name="category"
          required
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outline-required"
          label="Description"
          onChange={handleChange}
          name="description"
          value={productFormData.description}
          required
        />
        <TextField id="outline-required" label="Image" name="image" />

        <button id="submit-button" type="submit">
          Submit
        </button>
      </Box>
    </div>
  );
};

export default CreateProductForm;

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { MenuItem, toolbarClasses } from "@mui/material";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import Product from "../../model/ProductEntity.js";
import InputAdornment from "@mui/material/InputAdornment";

const CreateProductForm = ({ setSavedProducts }) => {
  const fileInputRef = useRef(null);

  const validateProductData = (localStorageProducts) => {
    if (
      !productFormData.title ||
      !productFormData.price ||
      !productFormData.description ||
      !category ||
      !productFormData.rating
    ) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (
      productFormData.title?.trim() === "" ||
      productFormData.price?.trim() === "" ||
      productFormData.description?.trim() === "" ||
      productFormData.rating?.trim() === ""
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

    const parsedRating = parseFloat(productFormData.rating);
    if (parsedRating <= 0 || parsedRating > 5 || isNaN(parsedRating)) {
      toast.error("Rating must be a number greater than 0 and less than 5");
      return false;
    }

    if (localStorageProducts.length >= 25) {
      toast.error("To prevent overflow you cant create more than 25 products");
      return false;
    }

    return true;
  };

  const convertToBase = (img) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const baseString = fileReader.result;
      setImage(baseString);
    };
    fileReader.readAsDataURL(img);
  };

  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [productFormData, setProductFormData] = useState({
    title: "",
    price: "",
    description: "",
    rating: "",
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

  const handleImageChange = (e) => {
    const imgFile = e.target.files[0];

    if (imgFile) convertToBase(imgFile);
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
      productFormData.description,
      image,
      productFormData.rating
    );

    if (localStorageProducts.length >= 5) {
      toast.error("Can't add more than 5 elements to prevent overflow");
      return;
    }

    setSavedProducts([...localStorageProducts, newProduct]);

    setProductFormData({
      title: "",
      price: "",
      description: "",
      rating: "",
    });

    setCategory("");
    setImage("");

    if (fileInputRef.current) fileInputRef.current.value = "";

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
          sx={{ m: 1, width: "25ch" }}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            },
          }}
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

        <TextField
          id="outline-required"
          label="Rating"
          onChange={handleChange}
          name="rating"
          value={productFormData.rating}
          sx={{ m: 1, width: "25ch" }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">&#9733;</InputAdornment>
              ),
            },
          }}
          required
        />

        <TextField name="image" type="file" onChange={handleImageChange} />

        <button id="submit-button" type="submit">
          Submit
        </button>
      </Box>
    </div>
  );
};

export default CreateProductForm;

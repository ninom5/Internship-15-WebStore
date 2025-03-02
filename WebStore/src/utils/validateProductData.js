import { toast } from "react-toastify";

const validateProductData = (
  productFormData,
  category,
  localStorageProducts
) => {
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

export default validateProductData;

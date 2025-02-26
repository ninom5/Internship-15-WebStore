import CreateProductForm from "../../components/CreateProductForm/CreateProductForm";
import { ToastContainer } from "react-toastify";

const AddNewProductPage = ({ setSavedProducts }) => {
  return (
    <>
      <CreateProductForm setSavedProducts={setSavedProducts} />
      <ToastContainer />
    </>
  );
};

export default AddNewProductPage;

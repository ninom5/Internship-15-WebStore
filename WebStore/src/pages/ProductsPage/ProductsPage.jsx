const ProductsPage = ({ setSavedProducts }) => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) throw new Error("Error fetching data");
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching data: ", error));

  return <></>;
};

export default ProductsPage;

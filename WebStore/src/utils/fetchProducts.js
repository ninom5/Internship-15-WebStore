const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Error fetching data");

    const data = await response.json();
    const localProducts = JSON.parse(localStorage.getItem("products")) || [];

    if (!Array.isArray(data) || !Array.isArray(localProducts))
      throw new Error("Data or localProducts is not an array");

    return [...localProducts, ...data].filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

export default fetchProducts;

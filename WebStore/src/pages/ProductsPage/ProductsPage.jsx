import { useEffect, useState } from "react";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const localProducts = JSON.parse(localStorage.getItem("products")) || [];

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Error fetching data");

        const data = await response.json();
        if (!Array.isArray(data) || !Array.isArray(localProducts)) {
          throw new Error("Data or localProducts is not an array");
        }
        const allProducts = [...data, ...localProducts];

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching data: ", error);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchedData();
  }, []);

  const sortedProducts = products.sort(
    (a, b) => b.rating?.rate - a.rating?.rate
  );
  const topProducts = sortedProducts.slice(0, 20);

  console.log("sorted: ", topProducts);

  if (loading) {
    return <LoadingSkeleton numberOfProducts={products.length} />;
  }

  return (
    <section className="all-products">
      {topProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductsPage;

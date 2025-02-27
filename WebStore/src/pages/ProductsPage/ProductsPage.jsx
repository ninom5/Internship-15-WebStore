import { useEffect, useState } from "react";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";

const ProductsPage = ({ setSavedProducts, savedProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = ({ product }) => {
    console.log(product);
  };

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

  if (loading) {
    return <LoadingSkeleton products={products} />;
  }

  return (
    <section className="all-products">
      {products.map((product) => (
        <div
          className="product-card"
          key={product.id}
          onClick={() => handleClick({ product })}
        >
          <div className="card-image">
            <img src={product.image} alt="product image" />
          </div>
          <div className="card-content">
            <h3 id="card-title">{product.title}</h3>
            <p id="card-description">{product.description}</p>
            <p id="card-price">
              {/* <p id="card-category">{product.category}</p> */}
              <b>{product.price} €</b>
              {/* {product.rating[0]} */}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductsPage;

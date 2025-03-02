import { useParams } from "react-router-dom";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import MayAlsoLike from "../../components/MayAlsoLike/MayAlsoLike";
import { useEffect, useState } from "react";
import fetchProducts from "../../utils/fetchProducts.js";

const ProductPage = ({
  savedProducts,
  fetchedProducts,
  setFetchedProducts,
}) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const allProducts = [...savedProducts, ...fetchedProducts];

    const uniqueProducts = allProducts.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    );

    const findProduct = uniqueProducts.find((p) => String(p.id) === productId);

    if (findProduct) {
      setProduct(findProduct);
      setLoading(false);
    } else {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const apiProducts = await fetchProducts();
          setFetchedProducts(apiProducts);

          const fetchedProduct = apiProducts.find(
            (p) => String(p.id) === productId
          );
          if (fetchedProduct) setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, savedProducts, fetchedProducts, setFetchedProducts]);

  if (loading) return <h2>Loading product...</h2>;

  if (!product) return <h2>Error: Product not found</h2>;

  return (
    <>
      <section className="product-content">
        <ProductDetails product={product} />
      </section>

      <MayAlsoLike
        savedProducts={[
          ...new Map(
            [...savedProducts, ...fetchedProducts].map((p) => [p.id, p])
          ).values(),
        ]}
      />
    </>
  );
};

export default ProductPage;

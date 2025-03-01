import { useParams } from "react-router-dom";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import MayAlsoLike from "../../components/MayAlsoLike/MayAlsoLike";

const ProductPage = ({ savedProducts }) => {
  const { productId } = useParams();
  const product = savedProducts.find((p) => String(p.id) === productId);

  if (!product) return <h2>Error showing product data</h2>;

  return (
    <>
      <section className="product-content">
        <ProductDetails product={product} />
      </section>

      <MayAlsoLike savedProducts={savedProducts} />
    </>
  );
};

export default ProductPage;

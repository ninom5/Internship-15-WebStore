import ProductCard from "../ProductCard/ProductCard.jsx";

const MayAlsoLike = ({ savedProducts }) => {
  return (
    <section className="may-also-like-section">
      <h1 id="may-also-like-heading">You may also like</h1>

      <div className="may-also-like-list">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MayAlsoLike;

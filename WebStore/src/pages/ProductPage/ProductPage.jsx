import { useParams } from "react-router-dom";

const ProductPage = ({ savedProducts }) => {
  const { productId } = useParams();
  const product = savedProducts.find((p) => String(p.id) === productId);

  if (!product) return <h2>Error showing product data</h2>;

  return (
    <section className="product-content">
      <div className="product-content__image">
        <img src={product.image} alt="product image" />
      </div>

      <div className="product-content__info">
        <h2>{product.title}</h2>
        <h4>{product.category}</h4>
        <h3>{product.description}</h3>

        <div className="price-rating">
          <p id="price">
            <i>Price: </i>
            {product.price}€
          </p>
          <p id="rating">{product.rating?.rate}&#9733;</p>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

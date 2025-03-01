import noImage from "../../assets/images/crossed-image.jpg";

const ProductDetails = ({ product }) => {
  return (
    <>
      <div className="product-content__image">
        <img src={product.image || noImage} alt="product image" />
      </div>

      <div className="product-content__info">
        <h2>{product.title}</h2>
        <h4>
          <i>Category: </i>
          {product.category}
        </h4>
        <h3>{product.description}</h3>

        <div className="price-rating">
          <p id="price">
            <i>Price: </i>
            {product.price}€
          </p>
          <p id="rating">
            <i>Rating: </i>
            {product.rating?.rate}
            <span id="rating-star">&#9733;</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

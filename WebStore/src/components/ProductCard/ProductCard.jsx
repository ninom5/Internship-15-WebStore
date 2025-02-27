import noImage from "../../assets/images/crossed-image.jpg";

const ProductCard = ({ product }) => {
  const handleClick = ({ product }) => {
    console.log(product);
  };

  return (
    <div className="product-card" onClick={() => handleClick({ product })}>
      <div className="card-image">
        <img src={product.image || noImage} alt="product image" />
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
  );
};

export default ProductCard;

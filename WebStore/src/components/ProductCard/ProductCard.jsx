import { useNavigate } from "react-router-dom";
import noImage from "../../assets/images/crossed-image.jpg";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/productPage/${product.id}`);
  };

  return (
    <div className="product-card" onClick={() => handleClick()}>
      <div className="card-image">
        <img src={product.image || noImage} alt="product image" />
      </div>
      <div className="card-content">
        <h3 id="card-title">{product.title}</h3>
        <p id="card-description">{product.description}</p>
        <p id="card-price">
          <b>{product.price} €</b>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const ProductsPage = ({ setSavedProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Error fetching data");

        const data = await response.json();
        setProducts(data);
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
    return (
      <div className="skeleton">
        {Array.from(new Array(products.length)).map((item, index) => (
          <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            {item ? (
              <img
                style={{ width: 210, height: 118 }}
                alt={item.title}
                src={item.src}
              />
            ) : (
              <Skeleton variant="rectangular" width={210} height={118} />
            )}
            {item ? (
              <Box sx={{ pr: 2 }}>
                <Typography gutterBottom variant="body2">
                  {item.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", color: "text.secondary" }}
                >
                  {item.channel}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {`${item.views} • ${item.createdAt}`}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </Box>
        ))}
      </div>
    );
  }

  return (
    <section className="all-products">
      {products.map((product) => (
        <div className="product-card">
          <div className="card-image">
            <img src={product.image} alt="product image" />
          </div>

          <div className="card-content">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>
              <b>{product.price}</b>
              {product.rating[0]}
            </p>
            <p>{product.category}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductsPage;

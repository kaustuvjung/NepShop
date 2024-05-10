import React from "react";
import { Link } from "react-router-dom";
import fallbackImage from "../../assets/product_36.png";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.image?.filepath} alt={product.name} />

      <p>{product.name}</p>
      <div>
        <Rating value={product.ratings} {...options} />{" "}
        <span className="productCardSpan">
          {" reviews"}({product.numOfReviews})
        </span>
      </div>
      <span>$Rs{product.price}</span>
    </Link>
  );
};

export default ProductCard;

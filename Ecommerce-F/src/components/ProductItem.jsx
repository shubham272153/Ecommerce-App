import { useContext } from "react";

import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); // Fallback currency

  // Safely accessing the first image or providing a fallback placeholder
  const productImage =
    image && image.length > 0
      ? `http://localhost:5000${image[0]}`
      : "/placeholder.jpg"; // Replace with actual placeholder image path

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={productImage}
          alt={name ? `${name} product image` : "Placeholder product image"} // Improved alt text
          loading="lazy" // Lazy loading for performance
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name || "Unnamed Product"}</p>{" "}
      {/* Fallback for name */}
      <p className="font-medium text-sm">
        {currency}
        {price !== undefined ? price : "N/A"} {/* Fallback for price */}
      </p>
    </Link>
  );
};

export default ProductItem;

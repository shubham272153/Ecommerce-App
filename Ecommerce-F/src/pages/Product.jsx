import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // Fetch product data by ID
  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image?.[0] || ""); // fallback empty string
      }
    }
  }, [productId, products]);

  // Validate selected size before adding to cart
  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size.");
      return;
    }
    addToCart(productData._id, size);
  };

  if (!productData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images?.length > 0 ? (
              productData.images.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  key={index}
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                    item === image ? "border-2 border-orange-500" : ""
                  }`}
                  src={item}
                  alt={productData.name || "Product"}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No images available</p>
            )}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={image || "/placeholder.jpg"}
              alt={productData.name || "Product"}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData.name || "Unnamed Product"}
          </h1>
          <div className="flex gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(151)</p>
          </div>
          <p className="mt-4 text-2xl font-medium">
            {currency}
            {productData.price || "N/A"}
          </p>
          <p className="mt-4 text-gray-500 md:w-4/5">
            {productData.description || "No description available."}
          </p>

          {/* Product Sizes */}
          {productData.sizes?.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product on your request</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-10">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (151)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            {productData.longDescription ||
              "No detailed description available."}
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.category || ""}
        subCategory={productData.subCategory || ""}
      />
    </div>
  );
};

export default Product;

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-2">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          // Add a safe check for product and its image array
          

          return (
            <div
              key={index}
              className=" justify-between  py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]} // Access safely now that we check if product exists
                  alt={productData.name}
                  className="w-12 h-12 object-cover"
                />
                <div>
                  <p>{productData.name}</p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-100">
                      {item.size}
                  </p>
                </div>
              </div>

              <div>
                <p>
                  {currency}
                  {productData.price * item.quantity}
                </p>
                <button
                  className="border-2 border-gray-300 text-sm font-semibold px-2"
                  onClick={() => {
                    updateQuantity(item._id, item.size, item.quantity - 1);
                  }}
                >
                  Remove
                </button>
              </div>

              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2"
                type="number"
                min={1}
                defaultValue={item.quantity}
                onClick={(e) =>
                  e.target.value === '' || e.target.value ==='0' ? null : updateQuantity( item._id, item.size,Number(e.target.value))}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

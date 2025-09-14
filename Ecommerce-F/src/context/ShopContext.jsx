import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Add to Cart Functionality
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product size");
      return;
    }
    const productExists = products.some((product) => product._id === itemId);
    if (!productExists) {
      toast.error("Product not found");
      return;
    }

    setCartItem((prevCart) => {
      const cartData = { ...prevCart };
      if (cartData[itemId]) {
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      } else {
        cartData[itemId] = { [size]: 1 };
      }
      toast.success("Item added to cart");
      return cartData;
    });
  };

  // ✅ Function (not memo) → so Navbar can call getCartCount()
  const getCartCount = () => {
    return Object.values(cartItem).reduce((totalCount, item) => {
      return (
        totalCount +
        Object.values(item).reduce((count, quantity) => count + quantity, 0)
      );
    }, 0);
  };

  // Update Quantity of Item in Cart
  const updateQuantity = (itemId, size, quantity) => {
    if (quantity <= 0) {
      setCartItem((prevCart) => {
        const cartData = { ...prevCart };
        if (cartData[itemId]) {
          delete cartData[itemId][size];
          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }
        }
        return cartData;
      });
    } else {
      setCartItem((prevCart) => {
        const cartData = { ...prevCart };
        cartData[itemId][size] = quantity;
        return cartData;
      });
    }
  };

  // ✅ Keep this one as memoized value since it's used for price calc
  const getCartAmount = () => {
    return Object.entries(cartItem).reduce((totalAmount, [itemId, sizes]) => {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += Object.entries(sizes).reduce(
          (amount, [size, quantity]) => amount + itemInfo.price * quantity,
          0
        );
      } else {
        console.error(`Product with ID ${itemId} not found`);
      }
      return totalAmount;
    }, 0);
  };

  // Fetch Products from Backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products data:", error);
      toast.error("Error fetching products data");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    setCartItem,
    getCartCount, // ✅ Now a function
    updateQuantity,
    getCartAmount, // ✅ Now a function too
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

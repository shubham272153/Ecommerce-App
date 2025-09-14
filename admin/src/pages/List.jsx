import { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        setError(null); // Clear error
      } else {
        toast.error(response.data.message);
        setError(response.data.message); // Set error
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setError("Failed to fetch product list");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const removeProduct = async (id) => {
    if (!token) {
      toast.error("Authorization token is missing");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Re-fetch list after removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []); // Ensure fetch if backendUrl changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>; // Display error message

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/*...............product item............ */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center"
          >
            <img
              className="w-12"
              src={item.images[0] || "/default-image.jpg"}
              alt={item.name || "Product Image"}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;

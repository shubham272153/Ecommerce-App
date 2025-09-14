import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AdminOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders (admin)
  const fetchOrders = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/order", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        backendUrl + `/api/order/update/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Order status updated");
        fetchOrders(); // Refresh orders
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-10">No orders found!</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Orders Panel</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>User:</strong> {order.user?.name} ({order.user?.email})
              </p>
            </div>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2">
              <strong>Products:</strong>
              <ul className="ml-4 list-disc">
                {order.products.map((prod) => (
                  <li key={prod._id}>
                    {prod.name} - Qty: {prod.quantity} - ₹{prod.price}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 font-semibold">Total: ₹{order.totalAmount}</p>

            <div className="mt-2 flex gap-2 items-center">
              <span>
                <strong>Status:</strong> {order.status}
              </span>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;

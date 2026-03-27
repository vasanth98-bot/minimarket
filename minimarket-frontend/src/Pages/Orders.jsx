import { useEffect, useState } from "react";
import API from "../Services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await API.get("/orders/my-orders");

        if (response.data && response.data.content) {
          setOrders(response.data.content);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    loadOrders(); // ✅ call inside effect
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.orderId}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h4>Order #{order.orderId}</h4>

            <p>
              <strong>Product ID:</strong> {order.productId}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Total Price:</strong> ₹ {order.totalPrice}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span style={{ fontWeight: "bold" }}>{order.status}</span>
            </p>

            <p>
              <strong>Order Time:</strong>{" "}
              {new Date(order.orderTime).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;

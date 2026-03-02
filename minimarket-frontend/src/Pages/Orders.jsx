import { useState } from "react";

function Orders() {
  const [orders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h4>Order #{index + 1}</h4>
            <p>
              <strong>Date:</strong> {order.date}
            </p>

            <div style={{ marginTop: "10px" }}>
              <strong>Items:</strong>
              {order.items.map((item) => (
                <div key={item.id} style={{ marginLeft: "10px" }}>
                  {item.name} - ₹ {item.price}
                </div>
              ))}
            </div>

            <h4 style={{ marginTop: "10px" }}>Total: ₹ {order.total}</h4>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;

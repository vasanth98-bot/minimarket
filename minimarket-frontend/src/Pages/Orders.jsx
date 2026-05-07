import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Mock data for demonstration (In real app, fetch from Supabase)
  const mockOrders = [
    {
      id: "ORD1001",
      name: "Apple iPhone 15 Pro",
      price: 129900,
      status: "SHIPPED",
      date: "2024-05-01",
      image: "https://p1.fds.com/img.jpg",
      steps: [
        { label: "Ordered", date: "May 01", completed: true },
        { label: "Packed", date: "May 02", completed: true },
        { label: "Shipped", date: "May 03", completed: true },
        { label: "Delivered", date: "Expected by May 07", completed: false },
      ]
    },
    {
      id: "ORD1002",
      name: "Sony WH-1000XM5",
      price: 29990,
      status: "DELIVERED",
      date: "2024-04-25",
      image: "https://p2.fds.com/img.jpg",
      steps: [
        { label: "Ordered", date: "Apr 25", completed: true },
        { label: "Packed", date: "Apr 26", completed: true },
        { label: "Shipped", date: "Apr 26", completed: true },
        { label: "Delivered", date: "Apr 28", completed: true },
      ]
    }
  ];

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const renderStepper = (steps) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", position: "relative", padding: "0 20px" }}>
        {/* Connector Line */}
        <div style={{
          position: "absolute",
          top: "15px",
          left: "40px",
          right: "40px",
          height: "2px",
          backgroundColor: "#e0e0e0",
          zIndex: 0
        }}></div>
        
        {steps.map((step, index) => (
          <div key={index} style={{ zIndex: 1, textAlign: "center", width: "80px" }}>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: step.completed ? "var(--fk-success)" : "white",
              border: `2px solid ${step.completed ? "var(--fk-success)" : "#e0e0e0"}`,
              margin: "0 auto 8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: step.completed ? "white" : "#e0e0e0",
              fontSize: "12px",
              fontWeight: "bold"
            }}>
              {step.completed ? "✓" : index + 1}
            </div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: step.completed ? "#212121" : "#878787" }}>{step.label}</div>
            <div style={{ fontSize: "10px", color: "#878787", marginTop: "2px" }}>{step.date}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container" style={{ marginTop: "20px", paddingBottom: "50px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600" }}>My Orders</h2>
        <span style={{ color: "var(--fk-text-muted)", fontSize: "14px" }}>({orders.length} orders)</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <img src={order.image} alt={order.name} style={{ width: "80px", height: "80px", objectFit: "contain" }} />
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "5px" }}>{order.name}</h3>
                  <p style={{ fontSize: "14px", color: "#878787" }}>Order ID: {order.id}</p>
                  <p style={{ fontSize: "16px", fontWeight: "600", marginTop: "10px" }}>₹{order.price}</p>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end", marginBottom: "10px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: order.status === "DELIVERED" ? "var(--fk-success)" : "var(--fk-blue)" }}></div>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{order.status}</span>
                </div>
                <button 
                  onClick={() => setTrackingOrder(trackingOrder === order.id ? null : order.id)}
                  style={{
                    backgroundColor: "white",
                    color: "var(--fk-blue)",
                    border: "1px solid #e0e0e0",
                    padding: "8px 20px",
                    borderRadius: "2px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  {trackingOrder === order.id ? "Hide Tracking" : "Track Order"}
                </button>
              </div>
            </div>

            {/* Tracking Stepper */}
            {trackingOrder === order.id && (
              <div style={{ backgroundColor: "#f9f9f9", padding: "30px 20px", borderTop: "1px solid #f0f0f0" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px", color: "#212121" }}>Tracking Status</h4>
                {renderStepper(order.steps)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;

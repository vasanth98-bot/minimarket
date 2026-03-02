import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Get cart data directly
  let cartCount = 0;

  try {
    const cartData = localStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];

    cartCount = cart.reduce((total, item) => {
      return total + (item.quantity ? item.quantity : 1);
    }, 0);
  } catch (error) {
    console.error("Cart parse error:", error);
    cartCount = 0;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#222",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/buyer")}
      >
        MiniMarket
      </div>

      <div>
        {!token && (
          <Link to="/" style={{ color: "white", marginRight: "20px" }}>
            Login
          </Link>
        )}

        {token && (
          <>
            <Link to="/buyer" style={{ color: "white", marginRight: "20px" }}>
              Products
            </Link>

            <Link to="/cart" style={{ color: "white", marginRight: "20px" }}>
              Cart ({cartCount})
            </Link>

            <Link to="/orders" style={{ color: "white", marginRight: "20px" }}>
              Orders
            </Link>

            <Link to="/seller" style={{ color: "white", marginRight: "20px" }}>
              Seller
            </Link>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ff4d4d",
                border: "none",
                padding: "6px 12px",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

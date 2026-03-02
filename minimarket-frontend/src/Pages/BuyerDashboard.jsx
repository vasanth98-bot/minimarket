import { useEffect, useState } from "react";
import API from "../Services/api";
import { useNavigate } from "react-router-dom";

function BuyerDashboard() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8080";

  // 🔎 Search products
  const searchProducts = async () => {
    try {
      if (search.trim() === "") {
        const res = await API.get("/products");
        setProducts(res.data);
        return;
      }

      const res = await API.get(`/products/search?keyword=${search}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // 📦 Load products
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [navigate]);

  // 🛒 Add to cart
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const productExists = existingCart.find((item) => item.id === product.id);

    if (productExists) {
      alert("Product already in cart!");
      return;
    }

    existingCart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("Product added to cart!");
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>All Products</h2>

        <div>
          <button
            onClick={() => navigate("/cart")}
            style={{
              padding: "8px 15px",
              marginRight: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            View Cart
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />

        <button
          onClick={searchProducts}
          style={{
            padding: "10px 15px",
            backgroundColor: "#4e73df",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* PRODUCTS GRID */}
      {products.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No products available.</p>
      ) : (
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {products.map((product) => {
            const imagePath =
              product.imageUrl && product.imageUrl.startsWith("http")
                ? product.imageUrl
                : `${BASE_URL}${product.imageUrl}`;

            return (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
              >
                {/* IMAGE */}
                {product.imageUrl && (
                  <img
                    src={imagePath}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />
                )}

                {/* PRODUCT DETAILS */}
                <h3>{product.name}</h3>

                <p style={{ color: "#666" }}>{product.description}</p>

                {/* CATEGORY */}
                {product.category && (
                  <p style={{ fontSize: "14px", color: "#888" }}>
                    Category: {product.category}
                  </p>
                )}

                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ₹ {product.price}
                </p>

                {/* STOCK */}
                <p
                  style={{
                    color: product.quantity > 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {product.quantity > 0
                    ? `In Stock (${product.quantity})`
                    : "Out of Stock"}
                </p>

                {/* ADD TO CART */}
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.quantity === 0}
                  style={{
                    padding: "10px",
                    backgroundColor:
                      product.quantity === 0 ? "gray" : "#4e73df",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BuyerDashboard;
